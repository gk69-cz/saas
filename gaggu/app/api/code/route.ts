import { auth } from "@clerk/nextjs";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});


export async function POST(req: Request) {
  try {
    console.log("within the try");
    console.log(Request)
 
    // New
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: "This story begins",
      max_tokens: 30,
    });
    console.log(completion.choices[0].text);
    return NextResponse.json(completion);
  } catch (error) {
    console.log("inside error");
    return new NextResponse("Internal error", { status: 500 });
  }
}
