import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PanelProps {
  title: string;
  collapsed: boolean;
  width: number;
  onToggle: () => void;
  children: React.ReactNode;
}

export default function Panel({
  title,
  collapsed,
  width,
  onToggle,
  children,
}: PanelProps) {
  return (
    <section
      style={{
        width: collapsed ? 52 : width,
      }}
      className={cn(
        "relative flex h-full shrink-0 transition-[width] duration-300 ease-in-out",
      )}
    >
      {collapsed ? (
        <div className="m-3 flex h-[calc(100%-24px)] w-[52px] flex-col items-center rounded-2xl border border-[#1A1A1A] bg-[#090909]">
          <button
            onClick={onToggle}
            className="mt-3 rounded-md p-1 text-neutral-400 transition hover:bg-[#171717] hover:text-white"
          >
            <ChevronRight size={18} />
          </button>

          <div className="mt-8 flex flex-1 items-center justify-center">
            <span
              className="select-none text-[11px] font-semibold uppercase tracking-[0.35em] text-neutral-500"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              {title}
            </span>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "m-3 flex h-[calc(100%-24px)] w-full flex-col overflow-hidden rounded-2xl border border-[#1A1A1A] bg-[#090909]",
            "transition-all duration-300 ease-out",
          )}
        >
          <div className="flex h-12 items-center justify-between border-b border-[#1A1A1A] px-4">
            <h2 className="text-sm font-semibold tracking-wide text-white">
              {title}
            </h2>

            <button
              onClick={onToggle}
              className="rounded-md p-1 text-neutral-400 transition hover:bg-[#171717] hover:text-white"
            >
              <ChevronLeft size={18} />
            </button>
          </div>

          <div
            className={cn(
              "flex-1 overflow-auto p-4",
              "transition-all duration-300",
            )}
          >
            {children}
          </div>
        </div>
      )}
    </section>
  );
}
