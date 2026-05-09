import { UI_CONSTANTS, ERROR_MESSAGES } from './constants'

/**
 * Sanitizes the user input by trimming whitespace, removing potentially 
 * dangerous characters, and enforcing the maximum length constraint.
 * 
 * @param input - The raw job title input.
 * @returns The sanitized job title.
 */
export function sanitize(input: string): string {
  return input
    .trim()
    .replace(/[<>"']/g, '')
    .slice(0, UI_CONSTANTS.MAX_JOB_TITLE_LENGTH)
}

/**
 * Validates the job title to ensure it meets length requirements.
 * 
 * @param jobTitle - The sanitized job title.
 * @returns An error message string if invalid, or null if valid.
 */
export function validate(jobTitle: string): string | null {
  if (!jobTitle) return ERROR_MESSAGES.REQUIRED_JOB_TITLE
  if (jobTitle.length < UI_CONSTANTS.MIN_JOB_TITLE_LENGTH) return ERROR_MESSAGES.TOO_SHORT_JOB_TITLE
  if (jobTitle.length > UI_CONSTANTS.MAX_JOB_TITLE_LENGTH) return ERROR_MESSAGES.TOO_LONG_JOB_TITLE
  return null
}
