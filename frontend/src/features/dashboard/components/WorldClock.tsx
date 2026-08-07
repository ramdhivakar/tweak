import { useEffect, useState } from "react";
import { ArrowRightLeft } from "lucide-react";

import { TIME_ZONES, convertTime } from "../utils/timeConverter";

export default function WorldClock() {
  const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const [localZoneValue, setLocalZoneValue] = useState(localZone);

  const [customerZone, setCustomerZone] = useState("America/New_York");

  const [localDateTime, setLocalDateTime] = useState(() =>
    new Date().toISOString().slice(0, 16),
  );

  const [customerDateTime, setCustomerDateTime] = useState(() =>
    convertTime(
      new Date().toISOString().slice(0, 16),
      localZone,
      "America/New_York",
    ),
  );

  useEffect(() => {
    setCustomerDateTime(
      convertTime(localDateTime, localZoneValue, customerZone),
    );
  }, [localDateTime, localZoneValue, customerZone]);

  function handleCustomerChange(value: string) {
    setCustomerDateTime(value);

    setLocalDateTime(convertTime(value, customerZone, localZoneValue));
  }

  function swapZones() {
    const oldLocal = localZoneValue;

    setLocalZoneValue(customerZone);

    setCustomerZone(oldLocal);

    setLocalDateTime(customerDateTime);

    setCustomerDateTime(localDateTime);
  }

  return (
    <div className="rounded-2xl border border-[#1B1B1B] bg-[#0B0B0B] p-4">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        {/* Local */}

        <div className="rounded-xl border border-[#222] bg-[#111] p-4">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
            Local
          </div>

          <input
            type="datetime-local"
            value={localDateTime}
            onChange={(e) => setLocalDateTime(e.target.value)}
            className="mb-3 w-full rounded-lg border border-[#2A2A2A] bg-[#171717] px-3 py-2 text-sm text-white outline-none"
          />

          <select
            value={localZoneValue}
            onChange={(e) => setLocalZoneValue(e.target.value)}
            className="w-full rounded-lg border border-[#2A2A2A] bg-[#171717] px-3 py-2 text-xs text-white"
          >
            {TIME_ZONES.map((zone) => (
              <option key={zone.value} value={zone.value}>
                {zone.label}
              </option>
            ))}
          </select>
        </div>

        {/* Swap */}

        <button
          onClick={swapZones}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#111] text-neutral-400 transition hover:border-[#8E2434] hover:text-white"
        >
          <ArrowRightLeft size={18} />
        </button>

        {/* Customer */}

        <div className="rounded-xl border border-[#222] bg-[#111] p-4">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
            Customer
          </div>

          <input
            type="datetime-local"
            value={customerDateTime}
            onChange={(e) => handleCustomerChange(e.target.value)}
            className="mb-3 w-full rounded-lg border border-[#2A2A2A] bg-[#171717] px-3 py-2 text-sm text-white outline-none"
          />

          <select
            value={customerZone}
            onChange={(e) => setCustomerZone(e.target.value)}
            className="w-full rounded-lg border border-[#2A2A2A] bg-[#171717] px-3 py-2 text-xs text-white"
          >
            {TIME_ZONES.map((zone) => (
              <option key={zone.value} value={zone.value}>
                {zone.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
