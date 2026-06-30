import type { Result } from '@/utils';

/**
 * AI assistance contract (e.g. auto-categorization, insights). Defined as an interface so
 * the provider — including which Claude model — is an implementation detail decided later.
 * No implementation ships in the foundation.
 */
export type CategorySuggestion = { categoryId: string; confidence: number };

export interface AiService {
  isEnabled(): boolean;
  suggestCategory(description: string): Promise<Result<CategorySuggestion | null, Error>>;
}
