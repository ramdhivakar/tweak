import { ChevronDown, ChevronRight } from "lucide-react";
import { useState, type ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function Section({
  title,
  children,
  defaultOpen = true,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-[#1A1A1A] bg-[#090909]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3"
      >
        <span className="font-medium text-white">{title}</span>

        {open ? (
          <ChevronDown size={18} />
        ) : (
          <ChevronRight size={18} />
        )}
      </button>

      {open && (
        <div className="border-t border-[#1A1A1A] p-4 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
}