export type ContactMode =
  | "Microsoft Teams"
  | "Phone"
  | "Email"
  | "Webex"
  | "Zoom"
  | "Other";

export type FirstInteractionStatus =
  | "Pending Customer"
  | "Pending Support"
  | "Pending Engineering";

export interface FirstInteraction {
  connectedTime: string;

  contactMode: ContactMode;

  troubleshootingSteps: string;

  resolutionSummary: string;

  status: FirstInteractionStatus;

  logsCollected: boolean;

  logFindings: string;

  attachments: FirstInteractionAttachment[];
}

export interface FirstInteractionAttachment {
  id: string;
  name: string;
  type: string;
  dataUrl?: string;
}