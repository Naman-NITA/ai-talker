"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import Webcam from 'react-webcam'

import useSpeechToText from 'react-hook-speech-to-text';

const RecordAnsSection = () => {

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  }); 
  

  return (

      <div className='flex items-center justify-center'>

    <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5 relative'>
  
   <Image src={'/Image.jpg'}  width={200} height={200}  className='absolute' alt="Page.not.found"/>
      
      <Webcam
      style={{
        height: 300,
        width: '100%',
        zIndex: 10,
      }}
      
      />
    
    </div>
       
        <Button variant="outline" className="my-10"
        
        
        >Record Answer</Button>

        
    </div>
  )
}


export default RecordAnsSection
