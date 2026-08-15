import type { FirstInteractionAIResult } from "../types/firstInteractionAI";
import type { Case } from "@/features/case/types/case";

export function generateMockFirstInteractionAI(
  currentCase: Case | null,
): FirstInteractionAIResult {
  return {
    connectedTime: "",
    contactMode: "Microsoft Teams",

    troubleshootingSteps: currentCase
      ? `Reviewed the reported issue with ${currentCase.customerName || "the customer"}. Reviewed the available case information and discussed the reported behavior.`
      : "Reviewed the reported issue with the customer and discussed the available information.",

    resolutionSummary:
      "Initial interaction completed. The reported issue was reviewed and the next troubleshooting steps were discussed with the customer.",

    status: "Pending Support",

    logsCollected: currentCase?.logsAvailable ?? false,

    logFindingsShared: false,

    logFindings: "",
  };
}