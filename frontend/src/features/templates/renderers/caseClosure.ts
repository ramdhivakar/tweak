import type { Case } from "@/features/case/types/case";
import { heading, paragraph, row } from "../utils/templateBuilder";

export function buildCaseClosure(c: Case) {
  let html = "";

  html += heading("Case Closure");

  html += row("Case Number", c.caseId);

  html += row("Customer", c.customerName);

  html += paragraph(
    "As we have not received any further updates regarding this case, we will proceed with closing it.",
  );

  html += paragraph(
    "If the issue persists or additional assistance is required, please reply to this email and the case can be reopened.",
  );

  html += paragraph("Thank you for contacting TD SYNNEX Support.");

  return html;
}
