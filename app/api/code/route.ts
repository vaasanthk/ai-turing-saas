import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit"
import { checkSubsricption } from "@/lib/subsbricption"

import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import Openai, { OpenAI } from "openai"

const openai = new Openai({
  apiKey: process.env.OPENAI_API_KEY,
})

const instructionMessage: OpenAI.Chat.ChatCompletionMessageParam = {
  role: "system",
  content:
    "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations",
}

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { messages } = body

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 })
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API key is required", { status: 500 })
    }

    const freeTrial = await checkApiLimit()
    const isPro = await checkSubsricption()

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trail had expired", { status: 403 })
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    })

    if (!isPro) {
      await increaseApiLimit()
    }

    return NextResponse.json(response.choices[0].message)
  } catch (error) {
    console.log("[CODE_ERROR]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
