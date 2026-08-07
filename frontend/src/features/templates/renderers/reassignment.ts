import type { Case } from "@/features/case/types/case";
import { heading, row, section, paragraph } from "../utils/templateBuilder";

export function buildReassignment(c: Case) {
  let html = "";

  html += heading("Case Reassignment");

  html += row("Case ID", c.caseId);

  html += row("Case Type", c.caseType);

  html += row("Customer", c.customerName);

  html += row("Company", c.companyName);

  html += row("Product", c.product);

  html += row("Version", c.productVersion);

  html += row("Primary Phone", c.phoneNumbers[0]?.value || "-");

  html += row(
    "Alternate Phone(s)",
    c.phoneNumbers
      .slice(1)
      .map((x) => x.value)
      .join("<br>") || "-",
  );

  html += row(
    "Customer Email(s)",
    c.emails.map((x) => x.value).join("<br>") || "-",
  );

  html += section("Issue");

  html += paragraph(c.issue || "-");

  html += section("Troubleshooting History");

  html += paragraph(c.troubleshootingSteps || "-");

  html += section("Log Review");

  html += paragraph(c.logReview || "-");

  html += section("Next Engineer Notes");

  html += paragraph("Continue investigation from the current findings.");

  return html;
}
