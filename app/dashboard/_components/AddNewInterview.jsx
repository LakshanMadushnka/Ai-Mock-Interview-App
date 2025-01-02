"use client";
import React, {useState} from 'react'
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {chatSession} from '@/utils/GeminAIModel';
import {LoaderCircle} from 'lucide-react';
import {db} from '@/utils/db';
import {MockInverview} from  '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import {useUser} from '@clerk/nextjs';
import moment from 'moment';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPossition, setJobPossition] = useState();
    const [jobDescription, setJobDescription] = useState();
    const [jobExperience, setJobExperience] = useState();
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const {user}=useUser();
    const onSubmit = async(e) => {
        setLoading(true)
        e.preventDefault()
        console.log(jobPossition, jobDescription, jobExperience);
        
        const InputPrompt="Job Position: "+jobPossition+", Job Description: "+jobDescription+",  Years of Experience: "+jobExperience+", Depends on this Information please give us "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" Interview question along with Answer in JSON Format, Give Question and Answered as field in JSON"
        
        const result = await chatSession.sendMessage(InputPrompt);
        const MockJsonResp=(result.response.text()).replace('```json','').replace('```','');
        console.log(JSON.parse(MockJsonResp));
        setJsonResponse(MockJsonResp);

        if(MockJsonResp){
        const resp= await db.insert(MockInverview)
        .values({
            mockId: uuidv4(),
            jsonMockResp:MockJsonResp,
            jobPosition:jobPossition,
            jobDesc: jobDescription,
            jobExperience: jobExperience,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format('DD-MM-YYYY')
        }).returning({mockId:MockInverview.mockId});

        console.log("Insert ID:",resp);
        
        if(resp){
            setOpenDialog(false);
        }

    else{
        console.log("Error in AI Model");
    }

        setLoading(false);
    
    }


  return (
    <div>
      <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all' onClick={() => setOpenDialog(true)}>
        <h2 className='text-lg text-center'>+ Add New</h2>
      </div>

      <Dialog open={openDialog}>
            
            <DialogContent className='max-w-2xl'>
                <DialogHeader>
                <DialogTitle className="text-2xl">Tell us more about you are interviewing</DialogTitle>
                <DialogDescription>
                        
                    <form onSubmit={onSubmit}>
                        <div>

                            <h2>Add about your job possition/role, Job description and years of experience</h2>

                            <div className='mt-7 my-3'>
                                <label >Job Role/Jobb Possition</label>
                                <Input placeholder="Ex. Full Stack Developer" required onChange={(event) => setJobPossition(event.target.value)} />
                            </div>

                            <div className='my-3'>
                                <label >Job Description/Tech Stack (In Short) </label>
                                <Textarea placeholder="Ex. React, Angular, NodeJs, Mysql etc" required  onChange={(event) => setJobDescription(event.target.value)} />
                            </div>

                            <div className="my-3">
                                <label>Year of experience</label>
                                <Input placeholder="Ex. 5" type="number" max="50" required   onChange={(event) => setJobExperience(event.target.value)} />
                            </div>  

                        </div>

                            <div className='flex gap-5 justify-end'>
                                <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                <Button type="submit" disabled={loading}>
                                    {loading ?
                                    <>
                                     <LoaderCircle className='animate-spin'/> 'Generating from AI'</>:'Start Interview'
                                    }
                                </Button>
                            </div>
                    </form>   

                </DialogDescription>
                </DialogHeader>
            </DialogContent>
      </Dialog>

    </div>
    
    
  )
}


export default AddNewInterview