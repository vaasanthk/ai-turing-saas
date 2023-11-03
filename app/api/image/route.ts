import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit"
import { checkSubsricption } from "@/lib/subsbricption"

import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import Openai from "openai"

const openai = new Openai({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { prompt, amount = 1, resoulution = "512x512" } = body

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 })
    }

    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 })
    }

    if (!resoulution) {
      return new NextResponse("resoulution is required", { status: 400 })
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API key is required", { status: 500 })
    }

    const freeTrial = await checkApiLimit()
    const isPro = await checkSubsricption()

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trail had expired", { status: 403 })
    }

    const response = await openai.images.generate({
      prompt,
      n: parseInt(amount, 10),
      size: resoulution,
    })

    if (!isPro) {
      await increaseApiLimit()
    }

    return NextResponse.json(response.data)
  } catch (error) {
    console.log("[IMAGE_ERROR]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
