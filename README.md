# Interview Question Generator

A production-quality Next.js app that generates 3 tailored interview questions for any job title, powered by the **Google Gemini API** via the **Vercel AI SDK**.

[**Live demo:**](https://interview-copilot-liart.vercel.app/)

---

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/interview-gen.git
cd interview-gen
npm install
```

### 2. Add your API key

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` to include your Google Gemini API key:

```env
GEMINI_API_KEY=your_key_here
```

Get a key at [Google AI Studio](https://aistudio.google.com/).

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Architecture & Structure

For a detailed dive into the architecture, data flow, and design decisions, please see our [Architecture Documentation](docs/architecture.md).

```text
├── app/
│   ├── api/generate/route.ts   # Server-side API route
│   ├── layout.tsx              # Root layout + metadata
│   ├── page.tsx                # Landing page
│   └── globals.css             # Tailwind + Custom Fonts
├── components/
│   ├── InterviewForm.tsx       # Client UI: input, validation, loading states
│   └── QuestionList.tsx        # Client UI: renders questions + copy utility
├── lib/
│   ├── constants.ts            # Centralized configs, UI limits, and system prompts
│   └── utils.ts                # Sanitization and validation utilities
├── types/
│   └── index.ts                # Shared TypeScript interfaces
└── docs/
    └── architecture.md         # Architectural documentation
```

### Key Technical Decisions

1. **Centralized Configurations**: Magic strings, limits, and system prompts are extracted into `lib/constants.ts` to improve maintainability and testability.
2. **Structured Outputs**: Instead of using manual Regex parsing, the application uses the Vercel AI SDK's structured output functionality (`Output.array`) coupled with `zod`. This guarantees a strictly typed array of strings from the LLM.
3. **API Key Security**: The `GEMINI_API_KEY` lives only in `process.env` on the server. The client calls `/api/generate` (our own Next.js route), meaning the API key is never exposed to the client.
4. **Prompt Injection Resistance**: The system prompt is cleanly separated from the user input (the job title).

---

## Deployment

```bash
# 1. Push to GitHub
git init && git add . && git commit -m "init"
git remote add origin https://github.com/YOUR_USERNAME/interview-gen.git
git push -u origin main

2. Import on Vercel
Go to vercel.com → New Project → import your repo

3. Add Environment Variable
Name: GEMINI_API_KEY
Value: your key

4. Deploy — Vercel builds automatically on every push
```

---

## Tech Stack

- [Next.js 16](https://nextjs.org) — App Router, API Routes
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Google Gemini API](https://ai.google.dev/)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
