export type FirstInteractionFieldType =
  | "datetime"
  | "select"
  | "textarea"
  | "switch";

export interface FirstInteractionField {
  id: string;
  label: string;
  type: FirstInteractionFieldType;
  placeholder?: string;
  options?: {
    label: string;
    value: string;
  }[];
  fullWidth?: boolean;
}

export const firstInteractionFields: FirstInteractionField[] = [
  {
    id: "connectedTime",
    label: "Connected Time",
    type: "datetime",
  },
  {
    id: "contactMode",
    label: "Contact Mode",
    type: "select",
    options: [
      { label: "Microsoft Teams", value: "Microsoft Teams" },
      { label: "Phone", value: "Phone" },
      { label: "Email", value: "Email" },
      { label: "Webex", value: "Webex" },
      { label: "Zoom", value: "Zoom" },
      { label: "Other", value: "Other" },
    ],
  },
  {
    id: "troubleshootingSteps",
    label: "Troubleshooting Steps Performed",
    type: "textarea",
    placeholder: "Enter troubleshooting steps...",
    fullWidth: true,
  },
  {
    id: "resolutionSummary",
    label: "Summary of Resolution",
    type: "textarea",
    placeholder: "Enter resolution summary...",
    fullWidth: true,
  },
  {
    id: "status",
    label: "Status of the Case",
    type: "select",
    options: [
      { label: "Pending Customer", value: "Pending Customer" },
      { label: "Pending Support", value: "Pending Support" },
      { label: "Pending Engineering", value: "Pending Engineering" },
    ],
  },
  {
    id: "logsCollected",
    label: "Logs Collected",
    type: "switch",
  },
  {
    id: "logFindings",
    label: "Log Review / Findings",
    type: "textarea",
    placeholder: "Enter log findings...",
    fullWidth: true,
  },
];