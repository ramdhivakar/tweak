import type { Case } from "@/features/case/types/case";

import {
  heading,
  paragraph,
  row,
  section,
} from "../utils/templateBuilder";

export function buildEngineeringEscalation(c: Case) {
  let html = "";

  html += heading("Engineering Escalation");

  /*
   * Case Information
   */

  html += row("Issue", c.issue || "-");
  html += row("TSE Email ID", c.tseEmail || "-");
  html += row("Case Number", c.caseId || "-");
  html += row("Company Name", c.companyName || "-");
  html += row("Customer Name", c.customerName || "-");
  html += row(
    "Customer Time Zone",
    c.timeZone || "-",
  );
  html += row(
    "Customer E-mail",
    c.customerEmail || "-",
  );
  html += row("Site ID", c.siteId || "-");
  html += row("Region", c.region || "-");
  html += row(
    "Environment",
    c.product
      ? `${c.product}${c.productVersion ? ` ${c.productVersion}` : ""}`
      : "-",
  );

  /*
   * Problem Description
   */

  html += section("Full Description of Problem");

  html += paragraph(
    c.description || "-",
  );

  /*
   * Customer Objective
   */

  html += section("What is the customer trying to do");

  html += paragraph(
    c.customerObjective || "-",
  );

  /*
   * Duplication
   */

  html += row(
    "Can this issue be duplicated",
    c.canBeDuplicated || "NA",
  );

  /*
   * Reproduction Steps
   */

  html += section(
    "What are the steps to reproduce the issue (IF APPLICABLE)",
  );

  html += paragraph(
    c.reproductionSteps || "NA",
  );

  /*
   * Attachments
   */

  html += row(
    "Attached screenshots and logs",
    c.attachmentsAvailable || "NA",
  );

  /*
   * Search Term
   */

  html += row(
    "Exact search term used",
    c.searchTerm || "NA",
  );

  /*
   * Latest Version
   */

  html += row(
    "Latest client/agent version tested",
    c.latestVersionTested || "No",
  );

  /*
   * Knowledge Articles
   */

  html += section(
    "What Articles was suggested to the customer",
  );

  html += paragraph(
    c.knowledgeArticles || "-",
  );

  /*
   * Troubleshooting
   */

  html += section("Troubleshooting steps");

  html += paragraph(
    c.troubleshootingSteps || "-",
  );

  /*
   * Reason for Escalation
   */

  html += section("Reason for Broadcom Case Creation");

  html += paragraph(
    c.escalationReason || "-",
  );

  /*
   * Closing
   */

  html += paragraph("Please advise on this.");

  return html;
}