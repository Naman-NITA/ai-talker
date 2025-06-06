"use client"

import { db } from "@/utils/db"
import { MockInterview } from "@/utils/schema"
import { eq } from "drizzle-orm"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import QuestionList from "./_components/QuestionList"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle, Loader2, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Dynamically import the RecordAnsSection to avoid SSR issues with webcam
const RecordAnsSection = dynamic(() => import("./_components/RecordAnsSection"), {
  ssr: false,
})

const StartInterview = () => {
  const InterviewId = useParams()
  const [interviewData, setInterviewData] = useState()
  const [MockInterviewQuestion, setMockInterviewQuestions] = useState([])
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isRecent, setIsRecent] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState([])

  useEffect(() => {
    GetInterviewDetails()
  }, [])

  const GetInterviewDetails = async () => {
    try {
      setLoading(true)
      const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, InterviewId.interviewId))

      let jsonMockResp
      try {
        jsonMockResp = JSON.parse(result[0].jsonMockResp)
      } catch (error) {
        console.error("Error parsing JSON:", error)
        return
      }

      // Handle both array and object structure
      if (Array.isArray(jsonMockResp)) {
        setMockInterviewQuestions(jsonMockResp) // Direct array
      } else if (jsonMockResp?.interviewQuestions && Array.isArray(jsonMockResp.interviewQuestions)) {
        setMockInterviewQuestions(jsonMockResp.interviewQuestions) // Object with array inside
      } else {
        console.warn("Unexpected structure for jsonMockResp", jsonMockResp)
        setMockInterviewQuestions([]) // fallback to empty
      }

      setInterviewData(result[0])

      // Check if this interview was created recently (within last 24 hours)
      const createdDate = new Date(result[0].createdAt.split("-").reverse().join("-"))
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      setIsRecent(createdDate >= yesterday)
    } catch (error) {
      console.error("Error fetching interview details:", error)
    } finally {
      setLoading(false)
    }
  }

  const markQuestionAnswered = (index) => {
    if (!answeredQuestions.includes(index)) {
      setAnsweredQuestions([...answeredQuestions, index])
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-500">Loading your interview questions...</p>
        </div>
      </div>
    )
  }

  const progress =
    MockInterviewQuestion.length > 0 ? Math.round(((activeQuestionIndex + 1) / MockInterviewQuestion.length) * 100) : 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with Progress */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Mock Interview: {interviewData?.jobPosition}
              </h1>
              {isRecent && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                  <Star className="w-3 h-3 mr-1" />
                  Recent
                </Badge>
              )}
            </div>
            <p className="text-gray-600 mt-1">
              Question {activeQuestionIndex + 1} of {MockInterviewQuestion.length}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-sm font-medium text-blue-700">{progress}%</div>
            <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <QuestionList
          MockInterviewQuestion={MockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          answeredQuestions={answeredQuestions}
        />

        <RecordAnsSection
          MockInterviewQuestion={MockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
          onAnswerRecorded={() => markQuestionAnswered(activeQuestionIndex)}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex flex-wrap justify-between items-center gap-4 border-t pt-6">
        <div>
          {answeredQuestions.includes(activeQuestionIndex) && (
            <div className="flex items-center text-green-600 text-sm">
              <CheckCircle className="w-4 h-4 mr-1" />
              Answer recorded
            </div>
          )}
        </div>

        <div className="flex gap-3 ml-auto">
          {activeQuestionIndex > 0 && (
            <Button
              onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
              variant="outline"
              className="flex items-center gap-2 border-gray-300 hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
          )}

          {activeQuestionIndex !== MockInterviewQuestion?.length - 1 && (
            <Button
              onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}

          {activeQuestionIndex === MockInterviewQuestion?.length - 1 && (
            <Link href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                Complete Interview
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default StartInterview
