import type { Case } from "@/features/case/types/case";
import { paragraph } from "../utils/templateBuilder";

export function buildNoVoiceMail(c: Case) {
  const phone =
    c.phoneNumbers
      ?.map((x) => x.value)
      .filter(Boolean)
      .join(", ") || "-";

  return paragraph(
    `Unable to reach the customer at ${phone}, no option to leave voice mail, sending chaser-1 email.`,
  );
}