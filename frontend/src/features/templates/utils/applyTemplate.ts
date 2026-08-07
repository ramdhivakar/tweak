import type { Case } from "@/features/case/types/case";

export function applyTemplate(template: string, currentCase: Case) {
  let result = template;

  result = result
    .replaceAll("{{caseId}}", currentCase.caseId || "")
    .replaceAll("{{customerName}}", currentCase.customerName || "")
    .replaceAll("{{companyName}}", currentCase.companyName || "")
    .replaceAll("{{siteId}}", currentCase.siteId || "")
    .replaceAll("{{product}}", currentCase.product || "")
    .replaceAll("{{productVersion}}", currentCase.productVersion || "")
    .replaceAll("{{issue}}", currentCase.issue || "")
    .replaceAll("{{description}}", currentCase.description || "")
    .replaceAll("{{timeZone}}", currentCase.timeZone || "")
    .replaceAll("{{availableLogs}}", currentCase.availableLogs || "")
    .replaceAll("{{previousCase}}", currentCase.previousCase || "")
    .replaceAll(
      "{{previousTroubleshooting}}",
      currentCase.previousTroubleshooting || "",
    )
    .replaceAll("{{emails}}", currentCase.emails.map((x) => x.value).join(", "))
    .replaceAll(
      "{{phones}}",
      currentCase.phoneNumbers.map((x) => x.value).join(", "),
    )
    .replaceAll("{{engineer}}", "Ram Dhivakar");

  return result;
}
