import type { Case } from "@/features/case/types/case";
import type { FirstInteractionAIResult } from "../types/firstInteractionAI";

import { generateMockFirstInteractionAI } from "../utils/mockFirstInteractionAI";

export type FirstInteractionAISource =
  | "case"
  | "transcript";

export interface FirstInteractionAIRequest {
  source: FirstInteractionAISource;
  currentCase: Case | null;
  transcriptFile?: File | null;
}

export async function generateFirstInteractionAI(
  request: FirstInteractionAIRequest,
): Promise<FirstInteractionAIResult> {
  /*
   * Temporary implementation.
   *
   * This will later call the FastAPI backend.
   *
   * Current flow:
   *
   * Frontend
   *    ↓
   * this service
   *    ↓
   * mock AI
   */

  return generateMockFirstInteractionAI(
    request.currentCase,
  );
}