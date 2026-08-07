import type { Case } from "@/features/case/types/case";
import { heading, paragraph, row, section } from "../utils/templateBuilder";

export function buildEngineeringEscalation(c: Case) {
  let html = "";

  html += heading("Engineering Escalation");

  html += row("Case Number", c.caseId);
  html += row("Customer", c.customerName);
  html += row("Product", c.product);
  html += row("Version", c.productVersion);

  html += section("Issue");

  html += paragraph(c.issue || "-");

  html += section("Troubleshooting Performed");

  html += paragraph(c.troubleshootingSteps || "-");

  html += section("Log Review");

  html += paragraph(c.logReview || "-");

  html += section("Reason For Escalation");

  html += paragraph(
    "Issue requires Engineering investigation as current troubleshooting has not resolved the issue.",
  );

  return html;
}
