import { useEffect, useState } from "react";

interface ClockConfig {
  label: string;
  zone: string;
}

const CLOCKS: ClockConfig[] = [
  {
    label: "LOCAL",
    zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  },
  {
    label: "EST / EDT",
    zone: "America/New_York",
  },
  {
    label: "CST / CDT",
    zone: "America/Chicago",
  },
  {
    label: "PST / PDT",
    zone: "America/Los_Angeles",
  },
];

function getTime(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);
}

function getDate(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}

function getZoneAbbreviation(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "short",
  })
    .formatToParts(date)
    .find((part) => part.type === "timeZoneName")?.value;
}

function ClockCard({
  clock,
  now,
}: {
  clock: ClockConfig;
  now: Date;
}) {
  const abbreviation = getZoneAbbreviation(now, clock.zone);

  return (
    <div className="rounded-xl border border-[#202020] bg-[#101010] px-4 py-3 transition-colors duration-200 hover:border-[#8E2434]/40">
      {/* Header */}

      <div className="mb-3 flex items-center justify-between">
        <span className="text-[9px] font-medium tracking-[0.25em] text-neutral-500">
          {clock.label}
        </span>

        <span className="rounded-md bg-[#8E2434]/10 px-2 py-0.5 text-[9px] font-medium text-[#A92C3F]">
          {abbreviation}
        </span>
      </div>

      {/* Time */}

      <div className="font-mono text-xl font-medium tracking-tight text-white">
        {getTime(now, clock.zone)}
      </div>

      {/* Date */}

      <div className="mt-1.5 text-[11px] text-neutral-500">
        {getDate(now, clock.zone)}
      </div>
    </div>
  );
}

export default function WorldClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className="rounded-2xl border border-[#1B1B1B] bg-[#0B0B0B] p-3">
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
        {CLOCKS.map((clock) => (
          <ClockCard
            key={clock.zone}
            clock={clock}
            now={now}
          />
        ))}
      </div>
    </div>
  );
}