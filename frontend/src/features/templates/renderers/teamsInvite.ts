import type { Case } from "@/features/case/types/case";

export function buildTeamsInvite(c: Case) {
  const caseNumber = c.caseId || "-";

  return `
    <div
      style="
        margin:0;
        padding:0;
        line-height:1.5;
        color:#111827;
      "
    >
      Hi
      <br><br>

      This email is in reference to case #${caseNumber}.
      <br><br>

      Please use the link below to join the Microsoft Teams meeting for further troubleshooting.
      <br><br>

      <strong>[ Paste Teams Meeting Link Here ]</strong>
      <br><br>

      Note: The meeting link expires in 15 minutes. If you are unable to join, please reply to this email with your available time, we will coordinate accordingly.
      <br><br>

      Regards
      <br>
      ESG Identity Management Security
      <br>
      TD SYNNEX Support
    </div>
  `;
}
