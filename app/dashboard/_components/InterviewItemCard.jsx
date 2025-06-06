"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { Calendar, Clock, Play, MessageSquare, Briefcase, Star } from "lucide-react"

const InterviewItemCard = ({ interview, isRecent = false }) => {
  const router = useRouter()

  const onStart = () => {
    router.push("/dashboard/interview/" + interview.mockId)
  }

  const onFeedbackPress = () => {
    router.push("/dashboard/interview/" + interview.mockId + "/feedback")
  }

  // Generate a random gradient for each card based on job position
  const getGradientClass = (jobPosition) => {
    const gradients = [
      "from-blue-500 to-purple-600",
      "from-green-500 to-teal-600",
      "from-pink-500 to-rose-600",
      "from-orange-500 to-red-600",
      "from-indigo-500 to-blue-600",
      "from-purple-500 to-pink-600",
      "from-teal-500 to-green-600",
      "from-yellow-500 to-orange-600",
    ]
    const index = jobPosition?.length % gradients.length || 0
    return gradients[index]
  }

  const gradientClass = getGradientClass(interview?.jobPosition)

  return (
    <div className="group relative bg-white hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1">
      {/* Gradient Header */}
      <div className={`h-2 bg-gradient-to-r ${gradientClass}`} />

      {/* Recent Badge */}
      {isRecent && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
            <Star className="w-3 h-3 mr-1" />
            Recent
          </Badge>
        </div>
      )}

      <div className="p-6">
        {/* Job Position with Icon */}
        <div className="flex items-start gap-3 mb-3">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${gradientClass} bg-opacity-10`}>
            <Briefcase className={`w-5 h-5 text-transparent bg-gradient-to-r ${gradientClass} bg-clip-text`} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
              {interview?.jobPosition}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <p className="text-sm font-medium text-gray-600">{interview?.jobExperience} Years Experience</p>
            </div>
          </div>
        </div>

        {/* Job Description Preview */}
        {interview?.jobDesc && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 line-clamp-2">
              {interview.jobDesc.length > 80 ? interview.jobDesc.substring(0, 80) + "..." : interview.jobDesc}
            </p>
          </div>
        )}

        {/* Created Date */}
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-gray-400" />
          <p className="text-xs text-gray-400">Created: {interview.createdAt}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 group/btn"
            onClick={onFeedbackPress}
          >
            <MessageSquare className="w-4 h-4 mr-2 group-hover/btn:text-blue-500 transition-colors" />
            Feedback
          </Button>
          <Button
            size="sm"
            className={`flex-1 bg-gradient-to-r ${gradientClass} text-white hover:shadow-lg hover:scale-105 transition-all duration-200 group/btn`}
            onClick={onStart}
          >
            <Play className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
            Start
          </Button>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-transparent group-hover:from-blue-50/20 group-hover:to-purple-50/20 transition-all duration-500 pointer-events-none" />
    </div>
  )
}

export default InterviewItemCard
