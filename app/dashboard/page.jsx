import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

const Dashboard = () => {
  return (
    <div className="p-5 sm:p-10 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h2 className="font-bold text-3xl text-gray-800">Dashboard</h2>
        <p className="text-gray-500">Create and Start Your AI Mock Interview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <AddNewInterview />
      </div>

      <InterviewList />
    </div>
  )
}

export default Dashboard
