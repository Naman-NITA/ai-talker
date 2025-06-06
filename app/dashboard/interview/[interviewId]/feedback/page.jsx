"use client"

import { db } from "@/utils/db"
import { UserAnswerTable, MockInterview } from "@/utils/schema"
import { eq } from "drizzle-orm"
import { useEffect, useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Award,
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronsUpDown,
  Download,
  Home,
  Loader2,
  MessageSquare,
  Share2,
  Star,
  ThumbsUp,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const Feedback = () => {
  const params = useParams()
  const [feedbackList, setFeedbackList] = useState([])
  const [interviewData, setInterviewData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isRecent, setIsRecent] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (params?.interviewId) {
      Promise.all([getFeedback(), getInterviewDetails()])
    }
  }, [params])

  const getFeedback = async () => {
    try {
      const result = await db
        .select()
        .from(UserAnswerTable)
        .where(eq(UserAnswerTable.mockIdRef, params.interviewId))
        .orderBy(UserAnswerTable.id)

      setFeedbackList(result)
      return result
    } catch (error) {
      console.error("Failed to fetch feedback", error)
      return []
    }
  }

  const getInterviewDetails = async () => {
    try {
      const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId))

      if (result && result.length > 0) {
        setInterviewData(result[0])

        // Check if this interview was created recently (within last 24 hours)
        const createdDate = new Date(result[0].createdAt.split("-").reverse().join("-"))
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        setIsRecent(createdDate >= yesterday)
      }

      setLoading(false)
      return result[0]
    } catch (error) {
      console.error("Failed to fetch interview details", error)
      setLoading(false)
      return null
    }
  }

  const calculateOverallRating = () => {
    if (!feedbackList || feedbackList.length === 0) return 0

    const totalRating = feedbackList.reduce((sum, item) => {
      const rating = Number.parseInt(item.rating) || 0
      return sum + rating
    }, 0)

    return Math.round((totalRating / feedbackList.length) * 10) / 10
  }

  const getStrengthsAndWeaknesses = () => {
    const strengths = []
    const weaknesses = []

    feedbackList.forEach((item) => {
      const rating = Number.parseInt(item.rating) || 0
      if (rating >= 4) {
        // Extract key phrases from high-rated answers
        const phrases = item.feedback
          .split(".")
          .filter((phrase) => phrase.toLowerCase().includes("good") || phrase.toLowerCase().includes("strong"))
          .map((phrase) => phrase.trim())
          .filter((phrase) => phrase.length > 0)

        if (phrases.length > 0) {
          strengths.push(...phrases)
        } else {
          // If no specific phrases found, use generic strength
          strengths.push(`Strong answer on "${item.question.substring(0, 50)}..."`)
        }
      }

      if (rating <= 3) {
        // Extract key phrases from low-rated answers
        const phrases = item.feedback
          .split(".")
          .filter(
            (phrase) =>
              phrase.toLowerCase().includes("improve") ||
              phrase.toLowerCase().includes("consider") ||
              phrase.toLowerCase().includes("should"),
          )
          .map((phrase) => phrase.trim())
          .filter((phrase) => phrase.length > 0)

        if (phrases.length > 0) {
          weaknesses.push(...phrases)
        } else {
          // If no specific phrases found, use generic weakness
          weaknesses.push(`Could improve on "${item.question.substring(0, 50)}..."`)
        }
      }
    })

    return {
      strengths: strengths.slice(0, 3), // Limit to top 3
      weaknesses: weaknesses.slice(0, 3), // Limit to top 3
    }
  }

  const overallRating = calculateOverallRating()
  const { strengths, weaknesses } = getStrengthsAndWeaknesses()

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
        <p className="text-gray-600">Loading your interview feedback...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4 sm:p-8">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 sm:p-10 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl sm:text-4xl font-bold">Interview Feedback</h1>
                {isRecent && (
                  <Badge className="bg-yellow-400 text-yellow-900 border-0">
                    <Star className="w-3 h-3 mr-1" />
                    Recent
                  </Badge>
                )}
              </div>
              <p className="text-blue-100">
                {interviewData?.jobPosition} • {interviewData?.jobExperience} Years Experience
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-200" />
              <span className="text-blue-100">{interviewData?.createdAt}</span>
            </div>
          </div>
        </div>

        {feedbackList.length === 0 ? (
          <div className="p-10 text-center">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-500 mb-2">No Interview Feedback Found</h2>
            <p className="text-gray-400 mb-6">
              You haven't completed any questions for this interview yet. Start the interview to get feedback.
            </p>
            <Button
              onClick={() => router.replace(`/dashboard/interview/${params.interviewId}`)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Go to Interview
            </Button>
          </div>
        ) : (
          <>
            {/* Summary Section */}
            <div className="p-6 sm:p-10">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column - Overall Rating */}
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-blue-500" />
                      Overall Performance
                    </h2>

                    <div className="flex items-center justify-center mb-4">
                      <div
                        className={`text-5xl font-bold ${
                          overallRating >= 4
                            ? "text-green-600"
                            : overallRating >= 3
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {overallRating}
                      </div>
                      <div className="text-2xl text-gray-400 ml-1">/5</div>
                    </div>

                    <div className="flex justify-center mb-6">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-6 h-6 ${
                              star <= Math.round(overallRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Technical Knowledge</span>
                          <span className="font-medium text-gray-800">
                            {Math.min(Math.round(overallRating * 1.1 * 10) / 10, 5)}/5
                          </span>
                        </div>
                        <Progress
                          value={Math.min(Math.round(overallRating * 1.1 * 20), 100)}
                          className="h-2 bg-gray-200"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Communication</span>
                          <span className="font-medium text-gray-800">
                            {Math.min(Math.round(overallRating * 0.9 * 10) / 10, 5)}/5
                          </span>
                        </div>
                        <Progress
                          value={Math.min(Math.round(overallRating * 0.9 * 20), 100)}
                          className="h-2 bg-gray-200"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Problem Solving</span>
                          <span className="font-medium text-gray-800">
                            {Math.min(Math.round(overallRating * 1.0 * 10) / 10, 5)}/5
                          </span>
                        </div>
                        <Progress
                          value={Math.min(Math.round(overallRating * 1.0 * 20), 100)}
                          className="h-2 bg-gray-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Strengths & Weaknesses */}
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 shadow-sm h-full">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-500" />
                      Key Insights
                    </h2>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-green-700 flex items-center gap-2 mb-2">
                          <ThumbsUp className="w-4 h-4" />
                          Strengths
                        </h3>
                        <ul className="space-y-2">
                          {strengths.length > 0 ? (
                            strengths.map((strength, index) => (
                              <li
                                key={index}
                                className="text-sm text-gray-700 bg-green-50 p-2 rounded-lg border border-green-100"
                              >
                                {strength}
                              </li>
                            ))
                          ) : (
                            <li className="text-sm text-gray-500 italic">No specific strengths identified</li>
                          )}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-medium text-amber-700 flex items-center gap-2 mb-2">
                          <MessageSquare className="w-4 h-4" />
                          Areas for Improvement
                        </h3>
                        <ul className="space-y-2">
                          {weaknesses.length > 0 ? (
                            weaknesses.map((weakness, index) => (
                              <li
                                key={index}
                                className="text-sm text-gray-700 bg-amber-50 p-2 rounded-lg border border-amber-100"
                              >
                                {weakness}
                              </li>
                            ))
                          ) : (
                            <li className="text-sm text-gray-500 italic">
                              No specific areas for improvement identified
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-6">Detailed Feedback</h2>

              <div className="space-y-4">
                {feedbackList.map((item, index) => {
                  // Check if this feedback was added recently (within last 2 hours)
                  const feedbackDate = new Date(item.createdAt.split("-").reverse().join("-"))
                  const twoHoursAgo = new Date()
                  twoHoursAgo.setHours(twoHoursAgo.getHours() - 2)
                  const isRecentFeedback = feedbackDate >= twoHoursAgo

                  return (
                    <Collapsible
                      key={index}
                      className={`border ${
                        isRecentFeedback ? "border-yellow-300 bg-yellow-50" : "border-gray-200 bg-gray-50"
                      } rounded-lg shadow-sm transition-all duration-300 hover:shadow-md`}
                    >
                      <CollapsibleTrigger className="w-full p-4 flex justify-between items-center text-left">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-full ${
                              Number.parseInt(item.rating) >= 4
                                ? "bg-green-100 text-green-600"
                                : Number.parseInt(item.rating) >= 3
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-red-100 text-red-600"
                            }`}
                          >
                            <span className="font-bold">{item.rating}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-800">{`Q${index + 1}: `}</span>
                            <span className="text-gray-700">{item.question}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {isRecentFeedback && (
                            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 mr-2">
                              <Star className="w-3 h-3 mr-1 fill-yellow-500 text-yellow-500" />
                              Recent
                            </Badge>
                          )}
                          <ChevronsUpDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="p-4 border-t border-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <h3 className="font-medium text-gray-700">Your Answer:</h3>
                              <p className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700">
                                {item.userAns}
                              </p>
                            </div>
                            <div className="space-y-3">
                              <h3 className="font-medium text-gray-700">Model Answer:</h3>
                              <p className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-gray-700">
                                {item.correctAns}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4">
                            <h3 className="font-medium text-gray-700 mb-2">Feedback & Suggestions:</h3>
                            <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 border border-blue-200 rounded-lg">
                              <div className="flex items-start gap-3">
                                <MessageSquare className="w-5 h-5 text-blue-500 mt-0.5" />
                                <p className="text-gray-700">{item.feedback}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  )
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t border-gray-200 p-6 flex flex-wrap justify-between items-center gap-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => router.replace(`/dashboard/interview/${params.interviewId}`)}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to Interview
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>

              <Button onClick={() => router.replace("/dashboard")} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Home className="w-4 h-4 mr-2" />
                Go to Dashboard
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Feedback
