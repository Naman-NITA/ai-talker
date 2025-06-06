"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useState } from "react"
import Webcam from "react-webcam"
import useSpeechToText from "react-hook-speech-to-text"
import { AlertCircle, CheckCircle, Loader2, Mic, MicOff, Star } from "lucide-react"
import { toast } from "sonner"
import { chatSession } from "@/utils/GeminiAIModal"
import { UserAnswerTable } from "@/utils/schema"
import { useUser } from "@clerk/nextjs"
import { db } from "@/utils/db"
import moment from "moment"

const RecordAnsSection = ({ MockInterviewQuestion, activeQuestionIndex, interviewData, onAnswerRecorded }) => {
  const [userAnswer, setUserAnswer] = useState("")
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [recordingInterval, setRecordingInterval] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [webcamReady, setWebcamReady] = useState(false)

  const { error, interimResult, isRecording, results, startSpeechToText, stopSpeechToText, setResults } =
    useSpeechToText({
      continuous: true,
      useLegacyResults: false,
    })

  useEffect(() => {
    if (typeof window !== "undefined" && results.length > 0) {
      const fullTranscript = results.map((result) => result.transcript).join(" ")
      setUserAnswer(fullTranscript)
    }
  }, [results])

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswerIn()
    }
  }, [userAnswer])

  useEffect(() => {
    // Reset state when question changes
    setUserAnswer("")
    setResults([])
    setFeedback(null)

    // Clear any existing interval
    if (recordingInterval) {
      clearInterval(recordingInterval)
      setRecordingInterval(null)
    }
    setRecordingTime(0)
  }, [activeQuestionIndex])

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText()

      // Clear the timer
      if (recordingInterval) {
        clearInterval(recordingInterval)
        setRecordingInterval(null)
      }
    } else {
      startSpeechToText()

      // Start the timer
      const interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
      setRecordingInterval(interval)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const UpdateUserAnswerIn = async () => {
    try {
      setLoading(true)

      const feedbackPrompt = `Question: ${MockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}, Depends on question and user answer for give interview question, Please give us rating for 
      answer and feedback as area of improvement if any in just 3 to 5 lines to improve it in JSON format with 
      rating field and feedback field`

      const result = await chatSession.sendMessage(feedbackPrompt)
      const mockJsonResp = result.response.text().replace("```json", "").replace("```", "")

      const JsonFeedbackResp = JSON.parse(mockJsonResp)
      setFeedback(JsonFeedbackResp)

      const resp = await db.insert(UserAnswerTable).values({
        mockIdRef: interviewData?.mockId,
        question: MockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: MockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      })

      if (resp) {
        toast.success("Answer recorded successfully")
        onAnswerRecorded && onAnswerRecorded()
      }
    } catch (error) {
      console.error("Error processing answer:", error)
      toast.error("Failed to process your answer")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b">
        <h3 className="text-sm font-medium text-gray-700">Record Your Answer</h3>
      </div>

      <div className="p-6">
        <div className="flex flex-col items-center">
          {/* Webcam Container */}
          <div className="relative w-full max-w-md mb-6">
            <div className="bg-black rounded-lg overflow-hidden shadow-lg relative">
              {/* Placeholder Image (only shown when webcam is not ready) */}
              {!webcamReady && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <Image
                    src="/Image.jpg"
                    width={400}
                    height={300}
                    alt="Webcam placeholder"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                      <p className="text-sm">Loading camera...</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Webcam */}
              <Webcam
                className="w-full h-auto rounded-lg relative z-10"
                style={{
                  minHeight: "300px",
                }}
                onUserMedia={() => {
                  console.log("Webcam ready")
                  setWebcamReady(true)
                }}
                onUserMediaError={(error) => {
                  console.error("Webcam error:", error)
                  setWebcamReady(false)
                }}
                mirrored={true}
              />

              {/* Recording Indicator */}
              {isRecording && webcamReady && (
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse z-30">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  REC {formatTime(recordingTime)}
                </div>
              )}

              {/* Camera Status Indicator */}
              {webcamReady && (
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium z-30">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Live
                </div>
              )}
            </div>
          </div>

          {/* Recording Controls */}
          <div className="w-full max-w-md">
            {loading ? (
              <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Loader2 className="w-5 h-5 animate-spin text-blue-500 mr-2" />
                <span className="text-gray-600">Processing your answer...</span>
              </div>
            ) : feedback ? (
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-green-800">Answer Recorded</h3>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Number.parseInt(feedback.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-green-700 text-sm">{feedback.feedback}</p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Transcription Preview */}
                {userAnswer && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200 max-h-32 overflow-y-auto">
                    <p className="text-sm text-gray-700">{userAnswer}</p>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <p className="text-sm text-red-700">
                        {error || "Error accessing microphone. Please check permissions."}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Record Button */}
            <Button
              disabled={loading || !webcamReady}
              onClick={StartStopRecording}
              className={`w-full ${
                isRecording
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
              } transition-all duration-200 ${!webcamReady ? "opacity-50 cursor-not-allowed" : ""}`}
              size="lg"
            >
              {isRecording ? (
                <div className="flex items-center justify-center gap-2">
                  <MicOff className="w-5 h-5" />
                  <span>Stop Recording</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Mic className="w-5 h-5" />
                  <span>{webcamReady ? "Record Answer" : "Waiting for camera..."}</span>
                </div>
              )}
            </Button>

            {/* Instructions */}
            <p className="text-xs text-gray-500 mt-2 text-center">
              {!webcamReady
                ? "Please allow camera access to start recording your answer."
                : isRecording
                  ? "Speak clearly into your microphone. Click 'Stop Recording' when finished."
                  : "Click 'Record Answer' and start speaking to record your response."}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecordAnsSection
