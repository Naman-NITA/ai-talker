"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { db } from "@/utils/db"
import { MockInterview } from "@/utils/schema"
import { eq } from "drizzle-orm"
import {
  Lightbulb,
  WebcamIcon,
  Play,
  CheckCircle,
  Clock,
  Users,
  Target,
  Mic,
  Video,
  Star,
  Briefcase,
  Calendar,
  Award,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Webcam from "react-webcam"

const Interview = () => {
  const [interviewData, setInterviewData] = useState(null)
  const [webCamEnabled, setwebCamEnabled] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isRecent, setIsRecent] = useState(false)

  const InterviewId = useParams()

  useEffect(() => {
    GetInterviewDetails()
  }, [])

  const GetInterviewDetails = async () => {
    try {
      setLoading(true)
      const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, InterviewId.interviewId))

      if (result[0]) {
        setInterviewData(result[0])

        // Check if this interview was created recently (within last 24 hours)
        const createdDate = new Date(result[0].createdAt.split("-").reverse().join("-"))
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        setIsRecent(createdDate >= yesterday)
      }
    } catch (error) {
      console.error("Error fetching interview details:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="my-10 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading interview details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="my-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <h1 className="font-bold text-3xl sm:text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Let's Get Started
          </h1>
          {isRecent && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
              <Star className="w-3 h-3 mr-1" />
              Recent
            </Badge>
          )}
        </div>
        <p className="text-gray-600 text-lg">Prepare yourself for the mock interview experience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Interview Details Section */}
        {interviewData && (
          <div className="space-y-6">
            {/* Job Details Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
                <div className="flex items-center gap-2 text-white">
                  <Briefcase className="w-5 h-5" />
                  <h2 className="text-xl font-semibold">Interview Details</h2>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Job Position</p>
                    <p className="text-lg font-semibold text-gray-800">{interviewData.jobPosition}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Tech Stack & Description</p>
                    <p className="text-gray-700">{interviewData.jobDesc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Award className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Experience Level</p>
                    <p className="text-lg font-semibold text-gray-800">{interviewData.jobExperience} Years</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Created On</p>
                    <p className="text-gray-700">{interviewData.createdAt}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Card */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border-2 border-yellow-200 shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-yellow-200 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                  </div>
                  <h2 className="text-xl font-bold text-yellow-800">Interview Tips & Information</h2>
                </div>

                <div className="space-y-4 text-yellow-800">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p>
                      <strong>Practice Makes Perfect:</strong> This mock interview will help you prepare for real
                      interviews by simulating actual interview conditions.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p>
                      <strong>AI-Powered Questions:</strong> You'll receive tailored questions based on your job
                      position and experience level.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p>
                      <strong>Real-time Feedback:</strong> Get instant feedback on your answers to improve your
                      interview performance.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p>
                      <strong>Take Your Time:</strong> There's no time limit. Answer thoughtfully and at your own pace.
                    </p>
                  </div>

                  <div className="bg-yellow-100 rounded-lg p-4 mt-4">
                    <p className="text-sm">
                      <strong>💡 Pro Tip:</strong> Speak clearly, maintain eye contact with the camera, and structure
                      your answers using the STAR method (Situation, Task, Action, Result).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Webcam Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-4">
              <div className="flex items-center gap-2 text-white">
                <Video className="w-5 h-5" />
                <h2 className="text-xl font-semibold">Camera & Microphone Setup</h2>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-col items-center">
                {webCamEnabled ? (
                  <div className="relative">
                    <Webcam
                      onUserMedia={() => setwebCamEnabled(true)}
                      onUserMediaError={() => setwebCamEnabled(false)}
                      mirrored={true}
                      className="rounded-xl shadow-lg"
                      style={{
                        height: 300,
                        width: 400,
                        maxWidth: "100%",
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      Live
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-8 mb-4">
                      <WebcamIcon className="h-24 w-24 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 mb-2">Camera access required</p>
                      <p className="text-sm text-gray-500">
                        Enable your camera and microphone for the best interview experience
                      </p>
                    </div>

                    <Button
                      onClick={() => setwebCamEnabled(true)}
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                      size="lg"
                    >
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4" />
                        <Mic className="w-4 h-4" />
                        Enable Camera & Microphone
                      </div>
                    </Button>
                  </div>
                )}
              </div>

              {webCamEnabled && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="w-5 h-5" />
                    <p className="font-medium">Camera and microphone are ready!</p>
                  </div>
                  <p className="text-sm text-green-600 mt-1">You can now start your mock interview.</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Tips Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
            <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Quick Setup Tips
            </h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                Ensure good lighting on your face
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                Position camera at eye level
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                Test your microphone audio
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                Find a quiet environment
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Start Interview Button */}
      <div className="flex justify-center">
        <Link href={`/dashboard/interview/${InterviewId.interviewId}/start`}>
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 px-8 py-4 text-lg"
            disabled={!webCamEnabled}
          >
            <Play className="w-5 h-5 mr-2" />
            Start Interview
          </Button>
        </Link>
      </div>

      {!webCamEnabled && (
        <p className="text-center text-sm text-gray-500 mt-4">
          Please enable your camera and microphone to start the interview
        </p>
      )}
    </div>
  )
}

export default Interview
