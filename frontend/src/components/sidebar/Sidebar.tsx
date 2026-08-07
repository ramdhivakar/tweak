import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import NewCaseDialog from "@/features/case/components/dialog/NewCaseDialog";
import { useCaseContext } from "@/features/case/context/CaseContext";

export default function Sidebar() {
  const { state, dispatch } = useCaseContext();
  const isTemplateMode = state.activeCase?.isTemporary;
  const [search, setSearch] = useState("");

  const filteredCases = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return state.cases;

    const startsWith = (value?: string) =>
      (value ?? "").toLowerCase().startsWith(q);

    const includes = (value?: string) =>
      (value ?? "").toLowerCase().includes(q);

    // Priority 1: Starts-with matches
    const prefixMatches = state.cases.filter((c) => {
      const phones = (c.phoneNumbers ?? []).map((p) =>
        (p?.value ?? "").toLowerCase(),
      );

      const emails = (c.emails ?? []).map((e) =>
        (e?.value ?? "").toLowerCase(),
      );

      return (
        startsWith(c.caseId) ||
        startsWith(c.customerName) ||
        startsWith(c.companyName) ||
        startsWith(c.product) ||
        startsWith(c.siteId) ||
        phones.some((p) => p.startsWith(q)) ||
        emails.some((e) => e.startsWith(q))
      );
    });

    if (prefixMatches.length > 0) {
      return prefixMatches;
    }

    // Priority 2: Contains matches
    return state.cases.filter((c) => {
      const phones = (c.phoneNumbers ?? []).map((p) =>
        (p?.value ?? "").toLowerCase(),
      );

      const emails = (c.emails ?? []).map((e) =>
        (e?.value ?? "").toLowerCase(),
      );

      return (
        includes(c.caseId) ||
        includes(c.customerName) ||
        includes(c.companyName) ||
        includes(c.product) ||
        includes(c.productVersion) ||
        includes(c.siteId) ||
        phones.some((p) => p.includes(q)) ||
        emails.some((e) => e.includes(q))
      );
    });
  }, [search, state.cases]);

  return (
    <div className="flex h-full flex-col bg-[#070707]">
      {/* Top */}
      <div className="space-y-3 border-b border-[#161616] p-4">
        <NewCaseDialog />

        <div className="flex items-center gap-2 rounded-lg border border-[#1b1b1b] bg-[#0c0c0c] px-3 py-2 text-sm text-neutral-500 transition-colors focus-within:border-[#8E2434]">
          <Search size={15} />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full bg-transparent text-sm text-neutral-300 outline-none placeholder:text-neutral-600"
          />
        </div>
      </div>

      {/* Case List */}
      {!isTemplateMode && (
        <div className="flex-1 overflow-y-auto px-2 py-3">
          <div className="space-y-1">
            {filteredCases.map((item) => {
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
                  className={`w-full rounded-lg border px-3 py-3 text-left transition-all ${
                    active
                      ? "border-[#8E2434] bg-[#121212]"
                      : "border-transparent hover:border-[#262626] hover:bg-[#0E0E0E]"
                  }`}
                >
                  <div className="truncate text-sm font-semibold text-white">
                    {item.caseId}
                  </div>

                  <div className="truncate text-[11px] text-neutral-500">
                    {item.product || "No Product"}
                  </div>
                </button>
              );
            })}

            {!filteredCases.length && (
              <div className="py-8 text-center text-sm text-neutral-500">
                No matching cases found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
