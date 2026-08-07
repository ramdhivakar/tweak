import type { Case } from "@/features/case/types/case";
import { heading, paragraph, row } from "../utils/templateBuilder";

export function buildNoVoiceMail(c: Case) {
  let html = "";

  html += heading("No Voice Mail");

  html += row("Case Number", c.caseId);

  html += row("Customer", c.customerName);

  html += row("Phone", c.phoneNumbers.map((x) => x.value).join("<br>") || "-");

  html += paragraph(
    "Unable to reach the customer. No voicemail option was available. Chaser email will be sent.",
  );

  return html;
}
