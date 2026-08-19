import type { Case } from "@/features/case/types/case";

import {
  heading,
  section,
  row,
  paragraph,
} from "../utils/templateBuilder";

export function buildFirstInteraction(c: Case) {
  let html = "";

  // Main heading
  html += heading("First Interaction:");

  // Basic case information
  html += row("Case Number", c.caseId);
  html += row(
    "Connected Time",
    c.connectedTime || "-",
  );
  html += row(
    "Contact Mode",
    c.contactMode || "-",
  );

  // Environment
  html += section("Environment:");

  html += row(
    "Product Name",
    c.product || "-",
  );

  html += row(
    "Product Version",
    c.productVersion || "-",
  );

  html += row(
    "Total Clients",
    c.totalClients || "-",
  );

  html += row(
    "Affected Clients",
    c.affectedClients || "-",
  );

  html += row(
    "Client OS",
    c.clientOS || "-",
  );

  html += row(
    "Server OS",
    c.serverOS || "-",
  );

  html += row(
    "Database",
    c.database || "-",
  );

  // Issue
  html += section("Issue:");

  html += paragraph(
    c.issue || "-",
  );

  // Case Description
  html += section("Case Description:");

  html += paragraph(
    c.description || "-",
  );

  // Troubleshooting
  html += section(
    "Troubleshooting Steps:",
  );

  html += paragraph(
    c.troubleshootingSteps || "-",
  );

  // Resolution
  html += section(
    "Resolution Summary:",
  );

  html += paragraph(
    c.resolutionSummary || "-",
  );

  // Final compact status information
  html += row(
    "Logs Collected",
    c.availableLogs || "No",
  );

  html += row(
    "Log Review / Findings",
    c.logReview || "Not shared",
  );

  html += row(
    "Case Status",
    c.status || "Pending Support",
  );

  return html;
}