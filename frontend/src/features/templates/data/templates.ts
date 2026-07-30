import type { Template } from "../types/template";

export const templates: Template[] = [
  {
    id: "first-response",
    category: "First Response",
    title: "Initial Customer Response",
    favorite: true,
    body: `Hello,

Thank you for contacting Broadcom Support.

My name is {{engineer}} and I will be assisting you with case {{caseId}}.

After reviewing your request, I understand the reported issue is:

{{issue}}

To continue the investigation, please provide the requested information below.

Thank you.
Regards,
{{engineer}}`,
  },

  {
    id: "logs",
    category: "Logs",
    title: "Request Logs",
    body: `Please collect and upload the following logs.

• SMPLogs
• Agent Logs
• System Information

Once uploaded, we will continue our investigation.`,
  },

  {
    id: "followup",
    category: "Follow Up",
    title: "Follow Up",
    body: `This is a follow-up regarding your support case.

Kindly provide the requested information at your earliest convenience.`,
  },

  {
    id: "engineering",
    category: "Escalation",
    title: "Engineering Escalation",
    body: `The issue requires further investigation.

We are engaging our Engineering team and will update you once additional findings are available.`,
  },

  {
    id: "closure",
    category: "Closure",
    title: "Case Closure",
    body: `As we have not received any further updates, we will proceed with closing this case.

Please reopen the case if further assistance is required.`,
  },
];