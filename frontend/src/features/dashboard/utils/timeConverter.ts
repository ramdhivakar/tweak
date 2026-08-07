import { format, fromZonedTime, toZonedTime } from "date-fns-tz";

export const TIME_ZONES = [
  {
    label: "Local",
    value: Intl.DateTimeFormat().resolvedOptions().timeZone,
  },
  { label: "EST / EDT", value: "America/New_York" },
  { label: "CST / CDT", value: "America/Chicago" },
  { label: "PST / PDT", value: "America/Los_Angeles" },
  { label: "GMT", value: "Europe/London" },
  { label: "UTC", value: "UTC" },
  { label: "IST", value: "Asia/Kolkata" },
  { label: "JST", value: "Asia/Tokyo" },
  { label: "AEST", value: "Australia/Sydney" },
];

export function convertTime(value: string, fromZone: string, toZone: string) {
  const utcDate = fromZonedTime(value, fromZone);

  const zonedDate = toZonedTime(utcDate, toZone);

  return format(zonedDate, "yyyy-MM-dd'T'HH:mm", {
    timeZone: toZone,
  });
}
