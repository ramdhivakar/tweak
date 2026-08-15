export interface FirstInteractionAIResult {
  connectedTime: string;
  contactMode: string;
  troubleshootingSteps: string;
  resolutionSummary: string;
  status:
    | "Pending Customer"
    | "Pending Support"
    | "Pending Engineering";
  logsCollected: boolean;
  logFindingsShared: boolean;
  logFindings: string;
}