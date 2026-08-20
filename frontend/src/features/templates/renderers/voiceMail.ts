import type { Case } from "@/features/case/types/case";
import { paragraph } from "../utils/templateBuilder";

export function buildVoiceMail(c: Case) {
  const phone =
    c.phoneNumbers
      ?.map((x) => x.value)
      .filter(Boolean)
      .join(", ") || "-";

  return paragraph(
    `Unable to reach the customer at ${phone}. Left a voicemail. Sending chaser-1 email.`,
  );
}