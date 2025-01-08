"use client";
import React, {useEffect, useState} from 'react'
import {db} from '@/utils/db';
import {MockInverview} from '@/utils/schema';
import {eq} from 'drizzle-orm';
import Webcam from 'react-webcam';
import {WebcamIcon} from 'lucide-react';
import {Button} from '@/components/ui/button';


function Interview({params}) {

    const [interviewData, setInterviewData] = useState();
    const [webCamEnabled, setWebCamEnabled] = useState();

    useEffect(() => {
        console.log(params.interviewId)
        GetInterviewDetails();
    }, [])
    
    const GetInterviewDetails = async() => {
        const result = await db.select().from(MockInverview)
        .where(eq(MockInverview.mockId, params.interviewId))
        

        setInterviewData(result[0]);

    } 


  return (
    <div className='my-10 flex justify-center flex-col items-center' >

       <h2 className='font-bold text-2xl'>Let's Get Started</h2>
       <div className='items-center flex flex-col my-5'>

         {webCamEnabled?
          <Webcam 
          onUseMedia={()=>setWebCamEnabled(true)} 
          onUserMediaError={()=>setWebCamEnabled(false)}
          mirrored={true}
          style={{height:300, width:300}} 
          />  :
          <>
          <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' />
          <Button onClick={()=>setWebCamEnabled(true)}>Enable Webcam and Microphone</Button>
          </>
          }
       </div>

       <div className='flex flex-col my-5 gap-5'>
          <h2 className='text-lg'><strong>Job Role/Job Position: </strong> {interviewData.jobPosition}</h2>
          <h2 className='text-lg'><strong>Job Description/Tech Stack: </strong> {interviewData.jobDesc}</h2>
          <h2 className='text-lg'><strong>Years of Experience: </strong> {interviewData.jobExperience}</h2>
       </div>
    </div>
  )
}

export default Interview