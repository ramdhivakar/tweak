import type { Case } from "@/features/case/types/case";

function cleanText(value?: string) {
  if (!value) return "-";

  return value
    .replace(/\r\n/g, "\n")
    .trim();
}

function formatList(value?: string) {
  if (!value?.trim()) {
    return "-";
  }

  return value
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .join("<br>");
}

function formatPhones(c: Case) {
  if (!c.phoneNumbers?.length) {
    return "-";
  }

  return (
    c.phoneNumbers
      .map((phone) => phone.value?.trim())
      .filter(Boolean)
      .join("<br>") || "-"
  );
}

function formatEmails(c: Case) {
  if (!c.emails?.length) {
    return "-";
  }

  return (
    c.emails
      .map((email) => email.value?.trim())
      .filter(Boolean)
      .join("<br>") || "-"
  );
}

export function buildInitialContact(c: Case) {
  const logsAvailable = Boolean(c.logsAvailable);
  const previousCaseAvailable = Boolean(
    c.previousCase?.trim(),
  );

  const issue = cleanText(c.issue);
  const description = cleanText(c.description);

  let html = "";

  html += `
    <div
      style="
        margin:0;
        padding:0;
        line-height:1.5;
        color:#111827;
      "
    >

      <div
        style="
          margin:0 0 24px 0;
          padding:0;
          font-size:24px;
          font-weight:700;
        "
      >
        Initial Contact Template
      </div>

      <div><strong>Case Number:</strong> ${cleanText(c.caseId)}</div>
      <div><strong>Customer Name:</strong> ${cleanText(c.customerName)}</div>
      <div><strong>Company Name:</strong> ${cleanText(c.companyName)}</div>
      <div><strong>Site ID:</strong> ${cleanText(c.siteId)}</div>

      <div>
        <strong>Phone Number(s):</strong> ${formatPhones(c)}
      </div>

      <div>
        <strong>Customer Email(s):</strong> ${formatEmails(c)}
      </div>

      <div>
        <strong>Time Zone:</strong> ${cleanText(c.timeZone)}
      </div>

      <br>

      <div>
        <strong>Product Name:</strong> ${cleanText(c.product)}
      </div>

      <div>
        <strong>Product Version:</strong> ${cleanText(c.productVersion)}
      </div>

      <br>

      <div>
        <strong>Case Type:</strong> ${cleanText(c.caseType)}
      </div>

      <div>
        <strong>Severity:</strong> ${cleanText(c.severity)}
      </div>

      <div>
        <strong>Logs Uploaded By Customer:</strong>
        ${logsAvailable ? "Yes" : "No"}
      </div>

      ${
        logsAvailable
          ? `
            <div>
              <strong>Available Logs:</strong>
              ${formatList(c.availableLogs)}
            </div>
          `
          : ""
      }

      <div>
        <strong>Previous Case Available:</strong>
        ${previousCaseAvailable ? "Yes" : "No"}
      </div>

      ${
        previousCaseAvailable
          ? `
            <div>
              <strong>Previous Case Number:</strong>
              ${cleanText(c.previousCase)}
            </div>

            <div>
              <strong>Previous Troubleshooting:</strong>
            </div>

            <div
              style="
                margin:0;
                padding:0;
                white-space:pre-wrap;
              "
            >
              ${formatList(c.previousTroubleshooting)}
            </div>
          `
          : ""
      }

      <br>

      <div>
        <strong>Issue:</strong>
      </div>

      <div
        style="
          margin:4px 0 0 0;
          padding:0;
          white-space:pre-wrap;
        "
      >${issue}</div>

      <br>

      <div>
        <strong>Case Description:</strong>
      </div>

      <div
        style="
          margin:4px 0 0 0;
          padding:0;
          white-space:pre-wrap;
        "
      >${description}</div>

    </div>
  `;

  return html;
}