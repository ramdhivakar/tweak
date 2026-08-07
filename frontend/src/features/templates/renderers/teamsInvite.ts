import type { Case } from "@/features/case/types/case";
import { heading, paragraph } from "../utils/templateBuilder";

export function buildTeamsInvite(c: Case) {
  let html = "";

  html += heading("Teams Invite");

  html += paragraph(`Hi ${c.customerName || ""},`);

  html += paragraph(`This email is in reference to case ${c.caseId}.`);

  html += paragraph(
    "Please click on the below Microsoft Teams meeting link to join for further troubleshooting.",
  );

  html += paragraph("<br><br><b>[ Paste Teams Meeting Link Here ]</b><br><br>");

  html += paragraph(
    "Note: The meeting link expires after the scheduled time. If you are unable to join, please reply to this email so a new meeting can be scheduled.",
  );

  html += paragraph("Regards,<br>Ram Dhivakar<br>TD SYNNEX Support");

  return html;
}
