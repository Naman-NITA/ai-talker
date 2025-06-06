"use client";

import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModal';
import { LoaderCircle, Plus } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment/moment';
import { useRouter } from 'next/navigation';

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);

  const router = useRouter();
  const { user } = useUser();

  // Memoized form reset function to improve performance
  const resetForm = useCallback(() => {
    setJobPosition('');
    setJobDesc('');
    setJobExperience('');
  }, []);

  // Handle dialog close with form reset
  const handleDialogClose = useCallback(() => {
    if (!loading) {
      setOpenDialog(false);
      // Only reset form when dialog actually closes and not during loading
      setTimeout(resetForm, 300);
    }
  }, [loading, resetForm]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const InputPrompt = `job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Based on this, give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT} interview questions with answers in JSON format. No extra explanation.`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');

      setJsonResponse(MockJsonResp);

      if (MockJsonResp) {
        const resp = await db.insert(MockInterview).values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          jobPosition,
          jobDesc,
          jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-YYYY')
        }).returning({ mockId: MockInterview.mockId });

        if (resp) {
          setOpenDialog(false);
          router.push('/dashboard/interview/' + resp[0]?.mockId);
        }
      }
    } catch (error) {
      console.error("ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center px-4 sm:px-0">
      <div
        className="w-full max-w-md bg-gradient-to-tr from-blue-100 via-indigo-50 to-purple-100 
                  border border-blue-200/70 rounded-xl shadow-md hover:shadow-xl 
                  transform hover:scale-[1.02] transition-all duration-300 ease-in-out 
                  cursor-pointer p-6 sm:p-8 md:p-10"
        onClick={() => setOpenDialog(true)}
        role="button"
        aria-label="Add new interview"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setOpenDialog(true)}
      >
        <div className="flex items-center justify-center gap-2 text-center">
          <Plus className="w-5 h-5 text-blue-700" />
          <h2 className="font-bold text-lg sm:text-xl text-blue-900">Add New Interview</h2>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-2xl w-[95%] sm:w-full rounded-xl bg-white shadow-2xl p-4 sm:p-6 md:p-8 border-blue-100">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-semibold text-center text-blue-800">
              Start Your Mock Interview
            </DialogTitle>

            <form onSubmit={onSubmit} className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Fill in job position, stack & experience level</p>

                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-1">
                    <label htmlFor="jobPosition" className="text-sm font-medium text-gray-700 block">
                      Job Role / Position
                    </label>
                    <Input
                      id="jobPosition"
                      placeholder="e.g. Full Stack Developer"
                      className="mt-1 focus:ring-2 focus:ring-blue-500 transition-all"
                      required
                      value={jobPosition}
                      onChange={(e) => setJobPosition(e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="jobDesc" className="text-sm font-medium text-gray-700 block">
                      Job Description / Tech Stack
                    </label>
                    <Textarea
                      id="jobDesc"
                      placeholder="e.g. React, Angular, Node.js, MySQL..."
                      className="mt-1 min-h-[80px] focus:ring-2 focus:ring-blue-500 transition-all"
                      required
                      value={jobDesc}
                      onChange={(e) => setJobDesc(e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="jobExperience" className="text-sm font-medium text-gray-700 block">
                      Years of Experience
                    </label>
                    <Input
                      id="jobExperience"
                      placeholder="e.g. 0-5"
                      type="number"
                      max="50"
                      className="mt-1 focus:ring-2 focus:ring-blue-500 transition-all"
                      required
                      value={jobExperience}
                      onChange={(e) => setJobExperience(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-4 pt-2 border-t border-gray-100">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={handleDialogClose} 
                  className="text-gray-600 hover:text-red-500 hover:bg-red-50 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading} 
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <LoaderCircle className="animate-spin w-4 h-4" />
                      <span>Generating...</span>
                    </span>
                  ) : 'Start Interview'}
                </Button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
