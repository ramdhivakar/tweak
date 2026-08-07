import type { Case } from "@/features/case/types/case";

import { heading, section, row, paragraph } from "../utils/templateBuilder";

function list(value: string) {
  if (!value.trim()) return "-";

  return value
    .split(/[,\n]/)
    .map((x) => x.trim())
    .filter(Boolean)
    .join("<br>");
}

export function buildInitialContact(c: Case) {
  let html = "";

  html += heading("Initial Contact");

  // Customer
  html += section("Customer Information");

  html += row("Case Number: ", c.caseId);
  html += row("Customer Name: ", c.customerName);
  html += row("Company Name: ", c.companyName);

  html += row(
    "Phone Number(s):",
    c.phoneNumbers.length
      ? c.phoneNumbers.map((x) => x.value).join("<br>")
      : "-",
  );

  html += row(
    "Customer Email(s): ",
    c.emails.length ? c.emails.map((x) => x.value).join("<br>") : "-",
  );

  html += row("Time Zone: ", c.timeZone);

  // Product
  html += section("Product Information:");

  html += row("Product Name: ", c.product);
  html += row("Product Version: ", c.productVersion);
  html += row("Site ID: ", c.siteId);

  // Support
  html += section("Support Information: ");

  html += row("Case Type: ", c.caseType);
  html += row("Severity: ", c.severity);

  html += row("Logs Uploaded By Customer: ", c.logsAvailable ? "Yes" : "No");

  if (c.logsAvailable) {
    html += row("Available Logs: ", list(c.availableLogs));
  }

  html += row("Previous Case Available: ", c.previousCase ? "Yes" : "No");

  if (c.previousCase) {
    html += row("Previous Case Number: ", c.previousCase);

    html += row("Previous Troubleshooting: ", list(c.previousTroubleshooting));
  }

  html += section("Issue:");

  html += row("", c.issue || "-");

  html += section("Case Description:");

  html += row("", c.description || "-");

  return html;
}
