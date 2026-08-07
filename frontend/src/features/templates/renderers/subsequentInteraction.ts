import type { Case } from "@/features/case/types/case";
import { heading, section, row, paragraph } from "../utils/templateBuilder";

export function buildSubsequentInteraction(c: Case) {
  let html = "";

  html += heading("Subsequent Interaction");

  html += row("Case Number", c.caseId);
  html += row("Connected Time", c.connectedTime || "-");
  html += row("Contact Mode", c.contactMode || "-");

  html += section("Troubleshooting Steps");
  html += paragraph(c.troubleshootingSteps || "-");

  html += section("Resolution Summary");
  html += paragraph(c.resolutionSummary || "-");

  html += section("Status");
  html += paragraph(c.status);

  html += section("Logs Collected");
  html += paragraph(c.availableLogs || "-");

  html += section("Log Review / Findings");
  html += paragraph(c.logReview || "-");

  return html;
}
