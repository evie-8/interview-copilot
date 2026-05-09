'use client'

import { useRef, useState, useEffect, KeyboardEvent } from 'react'
import QuestionList from '@/components/QuestionList'

import { GenerateResult } from '@/types'
import { UI_CONSTANTS, ERROR_MESSAGES } from '@/lib/constants'

export default function InterviewForm() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [jobTitle, setJobTitle] = useState('')
  const [result, setResult] = useState<GenerateResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Auto-focus the input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const charCount = jobTitle.length
  const isNearLimit = charCount >= UI_CONSTANTS.CHARACTER_COUNT_WARNING_THRESHOLD

  async function handleSubmit() {
    if (isLoading) return
    setError(null)
    setResult(null)

    const trimmed = jobTitle.trim()
    if (!trimmed) {
      setError(ERROR_MESSAGES.CLIENT_EMPTY_SUBMISSION)
      inputRef.current?.focus()
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle: trimmed }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || ERROR_MESSAGES.GENERIC_FALLBACK)
      }

      setResult(data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : ERROR_MESSAGES.GENERIC_FALLBACK)
    } finally {
      setIsLoading(false)
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      {/* Main input card */}
      <div className="w-full relative shadow-sm rounded-2xl border border-[#E5E3D8] bg-[#FFFFFF] transition-all focus-within:shadow-md focus-within:border-[#D4D1C9] flex flex-col">
        <div className="flex items-center w-full min-h-[72px] px-3 py-3">
          <div className="shrink-0 flex items-center justify-center w-10 h-10 text-[#8E8C87] ml-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={jobTitle}
            onChange={(e) => {
              setJobTitle(e.target.value)
              if (result || error) {
                setResult(null)
                setError(null)
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder={UI_CONSTANTS.PLACEHOLDER_JOB_TITLE}
            maxLength={UI_CONSTANTS.MAX_JOB_TITLE_LENGTH}
            disabled={isLoading}
            aria-label="Job title"
            className="flex-1 bg-transparent border-none outline-none py-2.5 pl-3 pr-4 text-[#2D2B28] placeholder-[#8E8C87] text-lg font-normal disabled:opacity-50"
          />

          <button
            onClick={handleSubmit}
            disabled={isLoading || !jobTitle.trim()}
            aria-label="Generate interview questions"
            className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-[#ECEBE5] text-[#2D2B28]
                       hover:bg-[#E4E2DB] active:scale-95 transition-all
                       disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#ECEBE5] disabled:scale-100"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-[#2D2B28]/30 border-t-[#2D2B28] rounded-full animate-spin" />
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Character counter */}
      <div className="w-full flex justify-end mt-2 px-2">
        <p className={`text-xs ${isNearLimit ? 'text-red-500' : 'text-[#8E8C87]'}`}>
          {charCount} / {UI_CONSTANTS.MAX_JOB_TITLE_LENGTH}
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div
          role="alert"
          className="mt-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm"
        >
          {error}
        </div>
      )}

      {/* Loading skeleton */}
      {isLoading && (
        <div className="w-full mt-6 pt-6 border-t border-gray-100 flex flex-col gap-3" aria-label="Loading questions">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-16 rounded-lg bg-gray-200 animate-pulse"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      )}

      {/* Results */}
      <div className="w-full mt-10">
        {result && !isLoading && (
          <QuestionList jobTitle={result.jobTitle} questions={result.questions} />
        )}
      </div>
    </div>
  )
}
