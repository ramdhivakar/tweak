import type { Case } from "@/features/case/types/case";
import { heading, paragraph, row } from "../utils/templateBuilder";

export function buildRequestLogs(c: Case) {
  let html = "";

  html += heading("Request Logs");

  html += row("Case Number", c.caseId);

  html += row("Customer", c.customerName);

  html += paragraph(
    "Please collect and upload the following logs for further investigation.",
  );

  html += paragraph(`
• SMP Logs

• Agent Logs

• Sylink Logs

• System Information

• Server Logs

• Relevant Screenshots
`);

  html += paragraph(
    "Once the logs are uploaded, we will continue the investigation.",
  );

  return html;
}
