import type { CaseSection } from "./caseFields";

export const editCaseFields: CaseSection[] = [
  {
    id: "environment",
    title: "Environment",
    columns: 2,

    fields: [
      {
        id: "connectedTime",
        label: "Connected Time",
        placeholder: "04 Aug 2026 10:30 AM",
        type: "text",
      },

      {
        id: "contactMode",
        label: "Contact Mode",
        type: "select",
        options: [
          { label: "Phone", value: "Phone" },
          { label: "Teams", value: "Teams" },
          { label: "Email", value: "Email" },
        ],
      },

      {
        id: "totalClients",
        label: "Total Clients",
        placeholder: "500",
        type: "text",
      },

      {
        id: "affectedClients",
        label: "Affected Clients",
        placeholder: "120",
        type: "text",
      },

      {
        id: "clientOS",
        label: "Client OS",
        placeholder: "Windows 11",
        type: "text",
      },

      {
        id: "serverOS",
        label: "Server OS",
        placeholder: "Windows Server 2022",
        type: "text",
      },

      {
        id: "database",
        label: "Database",
        placeholder: "SQL Server",
        type: "text",
      },
    ],
  },

  {
    id: "troubleshooting",
    title: "Troubleshooting",
    columns: 1,

    fields: [
      {
        id: "troubleshootingSteps",
        label: "Troubleshooting Steps",
        placeholder: "List troubleshooting steps...",
        type: "textarea",
      },

      {
        id: "resolutionSummary",
        label: "Resolution Summary",
        placeholder: "Summarize the resolution...",
        type: "textarea",
      },

      {
        id: "logReview",
        label: "Log Review / Findings",
        placeholder: "Mention log findings...",
        type: "textarea",
      },
    ],
  },
];
