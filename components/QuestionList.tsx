'use client'

import { useState } from 'react'

interface Props {
  jobTitle: string
  questions: string[]
}

export default function QuestionList({ jobTitle, questions }: Props) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const text = `Interview questions for: ${jobTitle}\n\n${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}`
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mt-6 pt-6 border-t border-gray-100">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-xl font-normal text-[#2D2B28]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {jobTitle}
        </h2>

        <button
          onClick={handleCopy}
          aria-label="Copy questions to clipboard"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium
                      border transition-colors
                      ${copied
                        ? 'border-green-300 text-green-700 bg-green-50'
                        : 'border-[#E5E3D8] text-[#605E5C] bg-white hover:bg-[#F3F2EE] hover:text-[#2D2B28]'
                      }`}
        >
          {copied ? '✓ Copied!' : '⎘ Copy'}
        </button>
      </div>

      {/* Question cards */}
      <ol className="flex flex-col gap-3" aria-label="Generated interview questions">
        {questions.map((question, index) => (
          <li
            key={index}
            className="flex gap-4 items-start py-2 animate-fade-slide"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            {/* Question number badge */}
            <span className="shrink-0 w-6 h-6 rounded-md bg-[#ECEBE5] text-[#2D2B28]
                             flex items-center justify-center text-xs font-medium mt-0.5">
              {index + 1}
            </span>

            {/* Question text */}
            <p className="text-[15px] text-[#2D2B28] leading-relaxed">{question}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
