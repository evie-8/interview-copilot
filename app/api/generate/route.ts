import { NextRequest, NextResponse } from 'next/server'
import { generateText, Output } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { z } from 'zod'

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || '',
})

import { AI_CONFIG, ERROR_MESSAGES } from '@/lib/constants'
import { sanitize, validate } from '@/lib/utils'

// ─── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Parse and sanitize the request body
  let body: { jobTitle?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: ERROR_MESSAGES.INVALID_BODY }, { status: 400 })
  }

  const jobTitle = sanitize(body.jobTitle ?? '')
  const validationError = validate(jobTitle)
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 })
  }

  // Ensure API key is configured server-side only — never exposed to the client
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not set.')
    return NextResponse.json({ error: ERROR_MESSAGES.SERVER_CONFIG_ERROR }, { status: 500 })
  }

  // Call the Google Gemini API using Vercel AI SDK
  try {
    const { output } = await generateText({
      model: google(AI_CONFIG.MODEL_NAME),
      system: AI_CONFIG.SYSTEM_PROMPT,
      prompt: `Job title: ${jobTitle}`,
      output: Output.array({
        element: z.string().describe('A role-specific interview question')
      })
    })

    return NextResponse.json({ questions: output, jobTitle })
  } catch (err) {
    console.error('AI SDK error:', err)
    return NextResponse.json({ error: ERROR_MESSAGES.API_FAILURE }, { status: 500 })
  }
}
