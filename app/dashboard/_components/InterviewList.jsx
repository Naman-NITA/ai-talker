"use client"

import { db } from "@/utils/db"
import { MockInterview } from "@/utils/schema"
import { useUser } from "@clerk/nextjs"
import { desc, eq } from "drizzle-orm"
import { useEffect, useState } from "react"
import InterviewItemCard from "./InterviewItemCard"
import { Search, Calendar, TrendingUp, BookOpen, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const InterviewList = () => {
  const { user } = useUser()
  const [interviewList, setInterviewList] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  useEffect(() => {
    user && GetInterviewList()
  }, [user])

  useEffect(() => {
    filterInterviews()
  }, [interviewList, searchTerm, selectedFilter])

  const GetInterviewList = async () => {
    try {
      setLoading(true)
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockInterview.id))

      setInterviewList(result)
    } catch (error) {
      console.error("Error fetching interviews:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterInterviews = () => {
    let filtered = interviewList

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (interview) =>
          interview.jobPosition?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          interview.jobDesc?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Experience filter
    if (selectedFilter !== "all") {
      filtered = filtered.filter((interview) => {
        const exp = Number.parseInt(interview.jobExperience)
        switch (selectedFilter) {
          case "junior":
            return exp <= 2
          case "mid":
            return exp > 2 && exp <= 5
          case "senior":
            return exp > 5
          default:
            return true
        }
      })
    }

    setFilteredList(filtered)
  }

  const getStats = () => {
    const total = interviewList.length
    const thisWeek = interviewList.filter((interview) => {
      const createdDate = new Date(interview.createdAt.split("-").reverse().join("-"))
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return createdDate >= weekAgo
    }).length

    return { total, thisWeek }
  }

  const stats = getStats()

  if (loading) {
    return (
      <div className="mt-10">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-gray-500">Loading your interviews...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-10 space-y-6">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Your Mock Interviews</h1>
            <p className="text-gray-600">Track your progress and improve your interview skills</p>
          </div>

          <div className="flex gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                  <p className="text-sm text-gray-500">Total Interviews</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-800">{stats.thisWeek}</p>
                  <p className="text-sm text-gray-500">This Week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by job position or tech stack..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-200 focus:border-blue-300 focus:ring-blue-200"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={selectedFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("all")}
              className="transition-all"
            >
              All
            </Button>
            <Button
              variant={selectedFilter === "junior" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("junior")}
              className="transition-all"
            >
              Junior (0-2y)
            </Button>
            <Button
              variant={selectedFilter === "mid" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("mid")}
              className="transition-all"
            >
              Mid (3-5y)
            </Button>
            <Button
              variant={selectedFilter === "senior" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("senior")}
              className="transition-all"
            >
              Senior (5+y)
            </Button>
          </div>
        </div>
      </div>

      {/* Interview Grid */}
      {filteredList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredList.map((interview, index) => (
            <InterviewItemCard
              interview={interview}
              key={interview.mockId || index}
              isRecent={index === 0} // Mark the first (most recent) interview
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 max-w-md mx-auto">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {searchTerm || selectedFilter !== "all" ? "No interviews found" : "No interviews yet"}
            </h3>
            <p className="text-gray-500 text-sm">
              {searchTerm || selectedFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Start your first mock interview to see it here"}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default InterviewList
