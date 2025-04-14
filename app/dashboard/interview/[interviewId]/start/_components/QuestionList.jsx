import { Lightbulb } from 'lucide-react'
import React from 'react'

const QuestionList = ( {MockInterviewQuestion , activeQuestionIndex}) => {

   console.log(activeQuestionIndex)

   console.log(MockInterviewQuestion[activeQuestionIndex]?.question)
  
  return MockInterviewQuestion&&(
    <div className='p-5 border rounded-lg'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
      {MockInterviewQuestion && MockInterviewQuestion.map((question, index) => (
  <h2
  key={index} // Unique key for each element
  className={`p-2 border rounded-full text-xs md:text-sm text-center cursor-pointer
    ${activeQuestionIndex === index ? 'bg-slate-600 text-white' : 'bg-slate-200 text-black'}`}
>
  Question #{index + 1}
</h2>
))}
      </div>
      <h2 className='my-5 text-md md:text-lg'>{
        MockInterviewQuestion[activeQuestionIndex]?.question
      }</h2>

 
<div className='border rounded-lg p-5 text-blue-500 mt-20'>
        <h2 className='flex gap-2 items-center text-primary'>
          <Lightbulb/>
          <strong>Note :</strong>
        </h2>

         <h2 className='text-sm text-primary my-2'>DATA FROM i TAK</h2>
      </div>

     
        

    </div>
  )
}

export default QuestionList
