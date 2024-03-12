'use client'
import axios from "axios";
import * as z from "zod";
import Heading from '@/components/Heading'
import { MessageSquare } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Content } from "next/font/google";
import { ChatCompletion } from "openai/resources/index.mjs";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import Useravatar from "@/components/useravatar";
import { BotAvatar } from "@/components/bot-avatar";

const ConversationPage = () => {
    const router = useRouter();
    const [message,setMessages] = useState<ChatCompletion[]>([])
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            prompt:""
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) =>{
       try {
        
        console.log(values)

        const response = await axios.post('/api/conversation',{message:values});
        console.log(response)

   

       form.reset()
        
       } catch (error:any) {
        console.log("inside catch")
        // Open throw pro model
        console.log(error)
       }finally{
        router.refresh()
       }
    };

  return (
    <div>
        <Heading 
         title='Conversation'
         description='Have a conversation with new advanced ai bot'
         icon={MessageSquare}
         iconColor='text-violet-500'
         bgColor='bg-violet-500/10'
         />
         <div className='m-7 px-4 lg:px-8'>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                    className="rounded-lg
                    border
                    w-full
                    p-4 px-3
                    md:px-6 
                    focus-within:shadow-sm 
                    grid grid-cols-12 
                    gap-2"
                    >
                        <FormField 
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input 
                                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                        disabled={isLoading}
                                        placeholder="How do i calculate the radius of a circle ?How do i calculate the radius of a circle ?"
                                        {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button className="col-span-12 lg:col-span-2" disabled={isLoading}>
                            Generate
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="space-y-4 mt-4">
                {isLoading && (
                    <div className="p-8 rounded-lg w-full flex item-center justify-center bg-muted">
                        <Loader />

                    </div>
                )}
                {/* {message.length === 0 && !isLoading && (
                    // <div>
                    //     <Empty label="No Conversation started" />
                    // </div>
                )} */}
                <div className="flex flex-col-reverse gap-y-4">
                    {message.map((message) => (     // uncomment when we get the api data
                        <div 
                         key={message.id}
                         className={ cn('p-8 w-full flex item-start gap-x-8 rounded-lg',
                          message ? "bg-white border border-black/10":"bg-muted")}
                         >
                            {/* {message = 'user' ? <Useravatar/> : <BotAvatar/>}
                            <p className="text-sm">
                               {message.id
                            </p>
  } */}
                        </div>
                     ))} 

                </div>

            </div>

         </div>
    </div>

  )
}

export default ConversationPage