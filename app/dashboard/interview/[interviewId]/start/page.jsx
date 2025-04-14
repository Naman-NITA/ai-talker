"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import QuestionList from './_components/QuestionList';
import RecordAnsSection from './_components/RecordAnsSection';

const StartInterview = () => {

 const InterviewId = useParams();

 console.log(InterviewId)

 const [interviewData, setInterviewData] = useState();
 const [MockInterviewQuestion, setMockInterviewQuestions] = useState([]);
 const [activeQuestionIndex, setActiveQuestionIndex] = useState(3);

 useEffect(() => {
   console.log(InterviewId.interviewId)
   GetInterviewDetails();
 }, [])

 const GetInterviewDetails = async () => {
   const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, InterviewId.interviewId))

   const jsonMockResp = JSON.parse(result[0].jsonMockResp);
   console.log(result)
     console.log(jsonMockResp.interviewQuestions)
   setMockInterviewQuestions(jsonMockResp.interviewQuestions);


   setInterviewData(result[0]);
 }

  return (
    <div>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10 p-3'>
      
   <QuestionList MockInterviewQuestion={MockInterviewQuestion}
    activeQuestionIndex={activeQuestionIndex}
   />

       

    </div>

      <RecordAnsSection
       MockInterviewQuestion = {MockInterviewQuestion}

       activeQuestionIndex = {activeQuestionIndex}

       interviewData = {interviewData}
      />
   
    </div>
  )
}

export default StartInterview
