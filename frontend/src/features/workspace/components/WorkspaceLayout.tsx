import { useState } from "react";

import Panel from "./Panel";
import CaseDetailsPanel from "./CaseDetailsPanel";
import TemplatesPanel from "./TemplatesPanel";
import OutputPanel from "./OutputPanel";

export default function WorkspaceLayout() {
  const [detailsCollapsed, setDetailsCollapsed] = useState(false);
  const [templatesCollapsed, setTemplatesCollapsed] = useState(false);

  return (
    <div className="flex h-full overflow-hidden">
      <Panel
        title="Case Details"
        width={340}
        collapsed={detailsCollapsed}
        onToggle={() => setDetailsCollapsed((v) => !v)}
      >
        <CaseDetailsPanel />
      </Panel>

      <Panel
        title="Templates"
        width={300}
        collapsed={templatesCollapsed}
        onToggle={() => setTemplatesCollapsed((v) => !v)}
      >
        <TemplatesPanel />
      </Panel>

      <section className="flex min-w-0 flex-1 flex-col bg-[#050505]">
        <div className="flex h-12 items-center border-b border-[#1A1A1A] px-5">
          <h2 className="text-sm font-semibold tracking-wide text-white">
            Output
          </h2>
        </div>

        <div className="flex-1 overflow-hidden">
          <OutputPanel />
        </div>
      </section>
    </div>
  );
}
