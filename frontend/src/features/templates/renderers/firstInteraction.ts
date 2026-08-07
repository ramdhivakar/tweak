import type { Case } from "@/features/case/types/case";
import { heading, section, row, paragraph } from "../utils/templateBuilder";

export function buildFirstInteraction(c: Case) {
  let html = "";

  html += heading("First Interaction");

  html += row("Case Number", c.caseId);
  html += row("Connected Time", c.connectedTime || "-");
  html += row("Contact Mode", c.contactMode || "-");

  html += section("Environment");

  html += row("Product Name", c.product);
  html += row("Product Version", c.productVersion);
  html += row("Total Clients", c.totalClients || "-");
  html += row("Affected Clients", c.affectedClients || "-");
  html += row("Client OS", c.clientOS || "-");
  html += row("Server OS", c.serverOS || "-");
  html += row("Database", c.database || "-");

  html += section("Issue");

  html += paragraph(c.issue);

  html += section("Case Description");

  html += paragraph(c.description);

  html += section("Troubleshooting Steps");

  html += paragraph(c.troubleshootingSteps || "-");

  html += section("Resolution Summary");

  html += paragraph(c.resolutionSummary || "-");

  html += section("Logs Collected");

  html += paragraph(c.availableLogs || "-");

  html += section("Log Review / Findings");

  html += paragraph(c.logReview || "-");

  html += section("Case Status");

  html += paragraph(c.status);

  return html;
}
