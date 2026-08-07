import type { Case } from "@/features/case/types/case";
import { heading, row, section, paragraph } from "../utils/templateBuilder";

export function buildHandoff(c: Case) {
  let html = "";

  html += heading("Case Handoff");

  html += row("Case ID", c.caseId);

  html += row("Customer", c.customerName);

  html += row("Company", c.companyName);

  html += row("Product", c.product);

  html += row("Version", c.productVersion);

  html += row("Severity", c.severity);

  html += section("Issue");

  html += paragraph(c.issue || "-");

  html += section("Troubleshooting Performed");

  html += paragraph(c.troubleshootingSteps || "-");

  html += section("Current Findings");

  html += paragraph(c.logReview || "-");

  html += section("Next Steps");

  html += paragraph("To be updated by the handing over engineer.");

  return html;
}
