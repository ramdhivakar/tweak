import type { Case } from "@/features/case/types/case";
import { heading, paragraph, row } from "../utils/templateBuilder";

function buildChaser(c: Case, title: string, message: string) {
  let html = "";

  html += heading(title);

  html += row("Case Number", c.caseId);

  html += row("Customer", c.customerName);

  html += paragraph(message);

  html += paragraph(
    "Kindly update us at your earliest convenience so we can continue investigating the issue.",
  );

  html += paragraph("Regards,<br>Ram Dhivakar<br>TD SYNNEX Support");

  return html;
}

export function buildChaser1(c: Case) {
  return buildChaser(
    c,
    "Chaser 1",
    "This is a gentle follow-up regarding your support case.",
  );
}

export function buildChaser2(c: Case) {
  return buildChaser(
    c,
    "Chaser 2",
    "This is our second follow-up regarding your support case.",
  );
}

export function buildChaser3(c: Case) {
  return buildChaser(
    c,
    "Chaser 3",
    "This is our final follow-up before the case is considered for closure.",
  );
}
