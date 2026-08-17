import type { Case } from "@/features/case/types/case";
import type { FirstInteraction } from "../types/firstInteraction";
import type { FirstInteractionAIResult } from "../types/firstInteractionAI";

export type FirstInteractionAISource =
  | "case"
  | "transcript";

export interface FirstInteractionAIRequest {
  source: FirstInteractionAISource;

  currentCase: Case | null;

  firstInteractionData: FirstInteraction;

  transcriptFile?: File | null;
}

const API_URL = "http://127.0.0.1:8000";

export async function generateFirstInteractionAI(
  request: FirstInteractionAIRequest,
): Promise<FirstInteractionAIResult> {
  const firstInteraction =
    request.firstInteractionData;

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

  const response = await fetch(
    `${API_URL}/api/ai/first-interaction`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
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
            Boolean(firstInteraction.logsCollected),

          logFindings:
            firstInteraction.logFindings ?? "",
        },
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `AI request failed (${response.status}): ${errorText}`,
    );
  }

  return response.json();
}