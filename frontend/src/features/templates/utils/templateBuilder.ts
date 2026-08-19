export function heading(title: string) {
  return `
    <div
      style="
        font-size:22px;
        font-weight:700;
        margin:0 0 18px 0;
        padding:0;
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
        margin:18px 0 0 0;
        padding:0 0 4px 0;
        border-bottom:1px solid #d1d5db;
        font-size:15px;
        line-height:20px;
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
        margin:0;
        padding:0;
      "
    >
      <tr>
        <td
          style="
            width:220px;
            padding:3px 0;
            vertical-align:top;
            font-weight:600;
            color:#4b5563;
          "
        >
          ${label}:
        </td>

        <td
          style="
            padding:3px 0;
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
        display:block;
        margin:6px 0 12px 0;
        padding:0;
        line-height:1.55;
        white-space:pre-wrap;
        color:#111827;
      "
    >
      ${value || "-"}
    </div>
  `;
}