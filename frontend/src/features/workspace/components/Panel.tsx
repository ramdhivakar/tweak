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
        "relative flex h-full shrink-0 flex-col overflow-hidden border-r border-[#1A1A1A] bg-[#090909] transition-[width] duration-300 ease-in-out",
      )}
    >
      <div className="flex h-12 items-center justify-between border-b border-[#1A1A1A] px-4">
        {!collapsed && (
          <h2 className="text-sm font-semibold tracking-wide text-white">
            {title}
          </h2>
        )}

        <button
          onClick={onToggle}
          className="rounded-md p-1 text-neutral-400 transition hover:bg-[#171717] hover:text-white"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {!collapsed && <div className="flex-1 overflow-auto p-4">{children}</div>}
    </section>
  );
}
