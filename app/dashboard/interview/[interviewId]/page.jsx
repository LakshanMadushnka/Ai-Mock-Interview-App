"use client";
import React, {useEffect, useState} from 'react'
import {db} from '@/utils/db';
import {MockInverview} from '@/utils/schema';
import {eq} from 'drizzle-orm';


function Interview({params}) {

    const [interviewData, setInterviewData] = useState();

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
    <div>Interview</div>
  )
}

export default Interview