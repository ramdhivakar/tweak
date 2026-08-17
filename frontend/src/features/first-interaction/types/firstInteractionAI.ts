export interface FirstInteractionAIResult {
  connectedTime: string;

  contactMode:
    | "Microsoft Teams"
    | "Phone"
    | "Email"
    | "Webex"
    | "Zoom"
    | "Other";

  troubleshootingSteps: string;

  resolutionSummary: string;

  status:
    | "Pending Customer"
    | "Pending Support"
    | "Pending Engineering";

  logsCollected: boolean;

  logFindings: string;
}