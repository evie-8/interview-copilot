import InterviewForm from '@/components/InterviewForm'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      {/* Page header */}
      <div className="text-center mb-8">
        <h1
          className="text-[32px] md:text-[40px] font-normal tracking-tight text-[#2D2B28]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Interview Questions Generator
        </h1>
      </div>

      {/* Main form card */}
      <InterviewForm />

      {/* Footer */}
      <p className="mt-8 text-xs text-[#8E8C87] flex items-center gap-1.5 font-medium">
        <span>✦</span>
        <span>Powered by Gemini</span>
      </p>
    </main>
  )
}
