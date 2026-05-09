// ─── AI Configuration ────────────────────────────────────────────────────────
export const AI_CONFIG = {
  MODEL_NAME: 'gemini-2.5-flash',
  SYSTEM_PROMPT: `You are an expert recruiter and seasoned hiring manager with 15+ years of experience across diverse industries.

Your task: generate exactly 3 incisive, role-specific interview questions for the job title provided.

Rules:
- Each question must probe a concrete skill, judgment, or behaviour specific to this exact role
- Avoid generic questions like "Tell me about yourself" or "What is your greatest weakness?"
- Prefer situational or behavioural framing (e.g., "Tell me about a time...", "How would you approach...")
- Keep each question under 30 words
- Provide exactly 3 questions without any extra commentary`
}

// ─── UI & Form Configuration ──────────────────────────────────────────────────
export const UI_CONSTANTS = {
  MAX_JOB_TITLE_LENGTH: 100,
  MIN_JOB_TITLE_LENGTH: 2,
  PLACEHOLDER_JOB_TITLE: 'Enter a job title (e.g. Customer Success Manager)',
  CHARACTER_COUNT_WARNING_THRESHOLD: 90,
}

// ─── Standardized Error Messages ─────────────────────────────────────────────
export const ERROR_MESSAGES = {
  REQUIRED_JOB_TITLE: 'Job title is required.',
  TOO_SHORT_JOB_TITLE: 'Job title is too short.',
  TOO_LONG_JOB_TITLE: `Job title must be ${UI_CONSTANTS.MAX_JOB_TITLE_LENGTH} characters or fewer.`,
  INVALID_BODY: 'Invalid request body.',
  SERVER_CONFIG_ERROR: 'Server configuration error.',
  API_FAILURE: 'Failed to generate questions. Please try again.',
  GENERIC_FALLBACK: 'Something went wrong. Please try again.',
  CLIENT_EMPTY_SUBMISSION: 'Please enter a job title before generating questions.',
}
