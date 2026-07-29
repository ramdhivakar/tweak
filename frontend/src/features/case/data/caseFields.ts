export type FieldType =
  | "text"
  | "textarea"
  | "select"
  | "switch"
  | "email-list"
  | "phone-list";

export interface SelectOption {
  label: string;
  value: string;
}

export interface CaseField {
  id: string;
  label: string;
  placeholder?: string;
  type: FieldType;

  required?: boolean;

  options?: SelectOption[];
}

export interface CaseSection {
  id: string;
  title: string;
  columns: 1 | 2;
  fields: CaseField[];
}

export const caseSections: CaseSection[] = [
  // ============================
  // Customer
  // ============================

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

  // ============================
  // Product
  // ============================

  {
    id: "product",
    title: "Product Information",
    columns: 2,

    fields: [
      {
        id: "product",
        label: "Product",
        placeholder: "Endpoint Protection",
        type: "text",
      },

      {
        id: "productVersion",
        label: "Version",
        placeholder: "14.3 RU9",
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
        label: "Logs Available",
        type: "switch",
      },
    ],
  },

  // ============================
  // Support
  // ============================

  {
    id: "support",
    title: "Support Information",
    columns: 2,

    fields: [
      {
        id: "severity",
        label: "Severity",
        type: "select",

        options: [
          {
            label: "Low",
            value: "Low",
          },

          {
            label: "Medium",
            value: "Medium",
          },

          {
            label: "High",
            value: "High",
          },

          {
            label: "Critical",
            value: "Critical",
          },
        ],
      },


      {
        id: "previousCase",
        label: "Previous Case",
        placeholder: "352001",
        type: "text",
      },
    ],
  },

  // ============================
  // Issue
  // ============================

  {
    id: "issue",
    title: "Issue Summary",
    columns: 1,

    fields: [
      {
        id: "issue",
        label: "Issue",
        placeholder: "Brief summary of the issue",
        type: "text",
      },
    ],
  },

  // ============================
  // Description
  // ============================

  {
    id: "description",
    title: "Description",
    columns: 1,

    fields: [
      {
        id: "description",
        label: "Description",

        placeholder:
          "Describe the issue, troubleshooting performed, customer observations, logs reviewed and expected behaviour.",

        type: "textarea",
      },
    ],
  },
];
