import { auth } from "@clerk/nextjs";
import axios from "axios";
import { NextResponse } from "next/server";

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});


export async function POST(req: Request) {
  console.log(Request);
  try {
    const data = await req.json();
    console.log(data);
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": "Hello!"}],
    });
    
    var value = chatCompletion.choices[0].message;
    console.log(chatCompletion.choices[0].message);
  
    return NextResponse.json(value);
  } catch (error) {
    console.log("inside error");
    return new NextResponse("Internal error", { status: 500 });
  }
}
