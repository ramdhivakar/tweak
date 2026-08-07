export function heading(title: string) {
  return `
    <div
      style="
        font-size:24px;
        font-weight:700;
        margin-bottom:28px;
        color:#111827;
      "
    >
      ${title}
    </div>
  `;
}

export function section(title: string) {
  return `
    <div
      style="
        margin-top:28px;
        margin-bottom:12px;
        padding-bottom:8px;
        border-bottom:2px solid #d1d5db;
        font-size:16px;
        font-weight:700;
        color:#111827;
      "
    >
      ${title}
    </div>
  `;
}

export function row(label: string, value?: string) {
  return `
    <table
      cellspacing="0"
      cellpadding="0"
      style="
        width:100%;
        border-collapse:collapse;
        margin-bottom:6px;
      "
    >
      <tr>
        <td
          style="
            width:220px;
            padding:6px 0;
            vertical-align:top;
            font-weight:600;
            color:#4b5563;
          "
        >
          ${label}
        </td>

        <td
          style="
            padding:6px 0;
            vertical-align:top;
            color:#111827;
          "
        >
          ${value || "-"}
        </td>
      </tr>
    </table>
  `;
}

export function paragraph(value?: string) {
  return `
    <div
      style="
        margin:8px 0 18px;
        line-height:1.7;
        white-space:pre-wrap;
        color:#111827;
      "
    >
      ${value || "-"}
    </div>
  `;
}
