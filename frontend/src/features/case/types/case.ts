export type Severity = "Low" | "Medium" | "High" | "Critical";

export type CaseStatus =
  | "New"
  | "Open"
  | "Pending"
  | "Waiting for Customer"
  | "Resolved"
  | "Closed";

export interface Contact {
  id: string;
  value: string;
}

export interface TimelineEvent {
  id: string;
  type: "note" | "email" | "status" | "system";
  title: string;
  description?: string;
  createdAt: string;
}

export interface Case {
  id: string;

  // Basic
  caseId: string;
  title: string;

  // Customer
  customerName: string;
  companyName: string;

  emails: Contact[];
  phoneNumbers: Contact[];

  // Product
  product: string;
  productVersion: string;
  siteId: string;

  // Support
  severity: Severity;
  status: CaseStatus;

  timeZone: string;

  logsAvailable: boolean;

  previousCase: string;

  issue: string;

  description: string;

  // Future
  notes: string;

  timeline: TimelineEvent[];

  createdAt: string;

  updatedAt: string;
}
