
/**
 * Process API errors consistently across the application
 */
export function processApiError(error: unknown): void {
  if (error instanceof Error) {
    console.error('API Error:', error.message);
    // You could add error tracking/reporting here
  } else {
    console.error('Unknown API error:', error);
  }
}
