import type { Case } from "@/features/case/types/case";
import type { FirstInteraction } from "../types/firstInteraction";
import type { FirstInteractionAIResult } from "../types/firstInteractionAI";

export type FirstInteractionAISource =
  | "case"
  | "transcript";

export interface FirstInteractionAIRequest {
  source: FirstInteractionAISource;

  currentCase: Case | null;

  /*
   * Preferred property.
   */
  firstInteractionData?: FirstInteraction;

  /*
   * Backward-compatible property.
   *
   * Some existing code may still send:
   *
   * firstInteraction: data
   */
  firstInteraction?: FirstInteraction;

  transcriptFile?: File | null;
}

const API_URL = "http://127.0.0.1:8000";

export async function generateFirstInteractionAI(
  request: FirstInteractionAIRequest,
): Promise<FirstInteractionAIResult> {
  /*
   * Support both property names.
   *
   * Preferred:
   * request.firstInteractionData
   *
   * Fallback:
   * request.firstInteraction
   */
  const firstInteraction =
    request.firstInteractionData ??
    request.firstInteraction;

  if (!firstInteraction) {
    console.error(
      "First Interaction data is missing.",
      request,
    );

    throw new Error(
      "First Interaction data is missing.",
    );
  }

  console.log(
    "AI service request:",
    {
      source: request.source,

      case: request.currentCase,

      firstInteraction,

      transcriptFile:
        request.transcriptFile?.name ?? null,
    },
  );

  /*
   * Build the exact payload expected
   * by the FastAPI backend.
   */
  const payload = {
    source: request.source,

    case: request.currentCase
      ? {
          caseId:
            request.currentCase.caseId ?? "",

          customerName:
            request.currentCase.customerName ?? "",

          companyName:
            request.currentCase.companyName ?? "",

          product:
            request.currentCase.product ?? "",

          productVersion:
            request.currentCase.productVersion ?? "",

          siteId:
            request.currentCase.siteId ?? "",

          issue:
            request.currentCase.issue ?? "",

          description:
            request.currentCase.description ?? "",

          timeZone:
            request.currentCase.timeZone ?? "",

          availableLogs:
            request.currentCase.availableLogs ?? "",

          previousCase:
            request.currentCase.previousCase ?? "",
        }
      : null,

    firstInteraction: {
      connectedTime:
        firstInteraction.connectedTime ?? "",

      contactMode:
        firstInteraction.contactMode ?? "",

      troubleshootingSteps:
        firstInteraction.troubleshootingSteps ?? "",

      resolutionSummary:
        firstInteraction.resolutionSummary ?? "",

      status:
        firstInteraction.status ??
        "Pending Support",

      logsCollected:
        Boolean(
          firstInteraction.logsCollected,
        ),

      logFindings:
        firstInteraction.logFindings ?? "",
    },
  };

  console.log(
    "AI request payload:",
    payload,
  );

  const response = await fetch(
    `${API_URL}/api/ai/first-interaction`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    },
  );

  const responseText =
    await response.text();

  console.log(
    "AI HTTP response:",
    {
      status: response.status,
      ok: response.ok,
      body: responseText,
    },
  );

  if (!response.ok) {
    throw new Error(
      `AI request failed (${response.status}): ${responseText}`,
    );
  }

  if (!responseText.trim()) {
    throw new Error(
      "AI service returned an empty response.",
    );
  }

  let result: unknown;

  try {
    result = JSON.parse(responseText);
  } catch {
    throw new Error(
      "AI service returned invalid JSON.",
    );
  }

  if (
    !result ||
    typeof result !== "object"
  ) {
    throw new Error(
      "AI service returned an invalid result.",
    );
  }

  const aiResult =
    result as FirstInteractionAIResult;

  console.log(
    "Parsed First Interaction AI result:",
    aiResult,
  );

  return aiResult;
}