'use client'
import axios from "axios";
import * as z from "zod";
import Heading from '@/components/Heading'
import { Code, MessageSquare } from 'lucide-react'
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

const CodePage = () => {
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
        
    //     const userMessage: ChatCompletion = [message: {
    //         role:'assistant',
    //         content:values.prompt
    //    }];
    //    const newMessage = [...message, userMessage];
    

        const response = await axios.post('/api/code', {messages: {role:'user',content:"what is the radius of the sun"}});
        console.log(response)

     //   setMessages((current) => [...current, 'userMessage,response.data']);

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
         title='Code Generation'
         description='Geenrate code with prompt'
         icon={Code}
         iconColor='text-green-700'
         bgColor='bg-green-700/10'
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
                                        placeholder="Simple toggle button with react hookss"
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

export default CodePage