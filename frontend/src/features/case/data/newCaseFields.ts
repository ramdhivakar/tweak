import type { CaseSection } from "./types";

export const newCaseFields: CaseSection[] = [
  // ==========================
  // Customer
  // ==========================

  {
    id: "customer",
    title: "Customer Information",
    columns: 2,

    fields: [
      {
        id: "caseId",
        label: "Case ID",
        placeholder: "352114",
        type: "text",
        required: true,
      },

      {
        id: "customerName",
        label: "Customer Name",
        placeholder: "John Doe",
        type: "text",
        required: true,
      },

      {
        id: "companyName",
        label: "Company",
        placeholder: "ABC Corporation",
        type: "text",
      },

      {
        id: "timeZone",
        label: "Time Zone",
        placeholder: "EST",
        type: "text",
      },

      {
        id: "emails",
        label: "Customer Emails",
        type: "email-list",
      },

      {
        id: "phoneNumbers",
        label: "Phone Numbers",
        type: "phone-list",
      },
    ],
  },

  // ==========================
  // Product
  // ==========================

  {
    id: "product",
    title: "Product Information",
    columns: 2,

    fields: [
      {
        id: "product",
        label: "Product",
        placeholder: "ITMS",
        type: "text",
      },

      {
        id: "productVersion",
        label: "Version",
        placeholder: "8.6",
        type: "text",
      },

      {
        id: "siteId",
        label: "Site ID",
        placeholder: "123456",
        type: "text",
      },

      {
        id: "logsAvailable",
        label: "Logs Uploaded by Customer",
        type: "switch",
      },

      {
        id: "availableLogs",
        label: "Available Logs",
        placeholder: "SMP Logs, Agent Logs...",
        type: "textarea",
      },
    ],
  },

  // ==========================
  // Support
  // ==========================

  {
    id: "support",
    title: "Support Information",
    columns: 2,

    fields: [
      {
        id: "caseType",
        label: "Case Type",
        type: "select",

        options: [
          { label: "Issue", value: "Issue" },
          { label: "Query", value: "Query" },
        ],
      },

      {
        id: "severity",
        label: "Severity",
        type: "select",

        options: [
          { label: "Low", value: "Low" },
          { label: "Medium", value: "Medium" },
          { label: "High", value: "High" },
          { label: "Critical", value: "Critical" },
        ],
      },

      {
        id: "hasPreviousCase",
        label: "Previous Case Available",
        type: "switch",
      },

      {
        id: "previousCase",
        label: "Previous Case Number",
        placeholder: "352001",
        type: "text",
      },

      {
        id: "previousTroubleshooting",
        label: "Previous Troubleshooting",
        placeholder: "Steps performed in previous case...",
        type: "textarea",
      },
    ],
  },

  // ==========================
  // Issue
  // ==========================

  {
    id: "issue",
    title: "Issue Summary",
    columns: 1,

    fields: [
      {
        id: "issue",
        label: "Issue",
        placeholder: "Brief summary",
        type: "text",
      },
    ],
  },

  // ==========================
  // Description
  // ==========================

  {
    id: "description",
    title: "Description",
    columns: 1,

    fields: [
      {
        id: "description",
        label: "Description",
        placeholder: "Describe the issue...",
        type: "textarea",
      },
    ],
  },
];
