"use client"

import { Lightbulb, Volume2, VolumeX } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const QuestionList = ({ MockInterviewQuestion, activeQuestionIndex, answeredQuestions = [] }) => {
  const [isSpeaking, setIsSpeaking] = useState(false)

  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel()
        setIsSpeaking(false)
        return
      }

      const speech = new SpeechSynthesisUtterance(text)

      // Get available voices and set a better one if available
      const voices = window.speechSynthesis.getVoices()
      const preferredVoice = voices.find(
        (voice) => voice.name.includes("Google") || voice.name.includes("Natural") || voice.name.includes("Female"),
      )

      if (preferredVoice) {
        speech.voice = preferredVoice
      }

      speech.rate = 0.9 // Slightly slower for better comprehension
      speech.pitch = 1

      speech.onend = () => {
        setIsSpeaking(false)
      }

      setIsSpeaking(true)
      window.speechSynthesis.speak(speech)
    } else {
      alert("Sorry, your browser does not support text to speech")
    }
  }

  const interviewTips = [
    "Take a moment to structure your thoughts before answering",
    "Use the STAR method (Situation, Task, Action, Result) for behavioral questions",
    "Be specific with examples from your experience",
    "It's okay to pause briefly to collect your thoughts",
    "Focus on demonstrating your problem-solving process",
    "Relate your answers to the job requirements when possible",
    "Keep your answers concise but complete (1-2 minutes per question)",
  ]

  // Get a consistent tip based on the question index
  const getTip = (index) => {
    return interviewTips[index % interviewTips.length]
  }

  return (
    MockInterviewQuestion && (
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        {/* Question Navigation */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Question Navigator</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
            {MockInterviewQuestion.map((question, index) => (
              <div
                key={index}
                className={`
                relative rounded-md text-center cursor-pointer transition-all duration-200
                ${
                  activeQuestionIndex === index
                    ? "bg-blue-600 text-white shadow-md"
                    : answeredQuestions.includes(index)
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
              >
                <div className="py-2 px-1 text-xs sm:text-sm">Q{index + 1}</div>
                {answeredQuestions.includes(index) && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Question */}
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-800">Question #{activeQuestionIndex + 1}</h2>
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center gap-1 text-sm ${isSpeaking ? "text-blue-600" : "text-gray-600"}`}
                onClick={() => textToSpeech(MockInterviewQuestion[activeQuestionIndex]?.question)}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    Stop Audio
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    Read Aloud
                  </>
                )}
              </Button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-gray-800 text-lg">{MockInterviewQuestion[activeQuestionIndex]?.question}</p>
            </div>
          </div>

          {/* Interview Tips */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-4 border border-yellow-200">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-yellow-100 rounded-full">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-yellow-800 mb-1">Interview Tip:</h3>
                <p className="text-yellow-700 text-sm">{getTip(activeQuestionIndex)}</p>
              </div>
            </div>
          </div>

          {/* Expected Answer Preview (hidden by default) */}
          {answeredQuestions.includes(activeQuestionIndex) && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">Key Points to Cover:</h3>
              <p className="text-blue-700 text-sm">
                {MockInterviewQuestion[activeQuestionIndex]?.answer?.substring(0, 100)}...
              </p>
              <p className="text-xs text-blue-500 mt-2">Full answer will be available in your feedback</p>
            </div>
          )}
        </div>
      </div>
    )
  )
}

export default QuestionList
