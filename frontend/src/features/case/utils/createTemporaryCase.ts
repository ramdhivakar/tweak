import type { Case } from "../types/case";

export function createTemporaryCase(): Case {
  return {
    id: crypto.randomUUID(),
    isTemporary: true,

    caseId: "TEMPLATE",

    customerName: "",
    companyName: "",

    phoneNumbers: [],
    emails: [],

    product: "",
    productVersion: "",

    siteId: "",

    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,

    caseType: "Issue",
    severity: "Medium",

    logsAvailable: false,
    availableLogs: "",

    previousCase: "",
    previousTroubleshooting: "",

    issue: "",
    description: "",

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
