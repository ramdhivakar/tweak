import { Search } from "lucide-react";

import NewCaseDialog from "@/features/case/components/dialog/NewCaseDialog";
import { useCaseContext } from "@/features/case/context/CaseContext";

export default function Sidebar() {
  const { state, dispatch } = useCaseContext();

  return (
    <div className="flex h-full flex-col bg-[#070707]">
      {/* Top */}
      <div className="space-y-3 border-b border-[#161616] p-4">
        <NewCaseDialog />

        <div className="flex items-center gap-2 rounded-lg border border-[#1b1b1b] bg-[#0c0c0c] px-3 py-2 text-sm text-neutral-500 transition-colors focus-within:border-[#8E2434]">
          <Search size={15} />

          <input
            placeholder="Search cases..."
            className="w-full bg-transparent text-sm text-neutral-300 outline-none placeholder:text-neutral-600"
          />
        </div>
      </div>

      {/* Case List */}
      <div className="flex-1 overflow-y-auto px-2 py-3">
        <div className="space-y-1">
          {state.cases.map((item) => {
            const active = state.activeCase?.id === item.id;

            return (
              <button
                key={item.id}
                onClick={() =>
                  dispatch({
                    type: "SET_ACTIVE_CASE",
                    payload: item.id,
                  })
                }
                className={`group w-full rounded-md border px-3 py-2 text-left transition-all duration-200 ${
                  active
                    ? "border-[#8E2434] bg-[#121212]"
                    : "border-transparent hover:border-[#262626] hover:bg-[#0E0E0E]"
                }`}
              >
                <div className="flex flex-col">
                  <span className="truncate text-sm font-medium text-neutral-100">
                    {item.caseId}
                  </span>

                  <span className="truncate text-[11px] text-neutral-500">
                    {item.product || "No Product"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
