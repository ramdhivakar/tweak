import { useState } from "react";

import Panel from "./Panel";
import CaseDetailsPanel from "./CaseDetailsPanel";
import TemplatesPanel from "./TemplatesPanel";
import OutputPanel from "./OutputPanel";

import { useCaseContext } from "@/features/case/context/CaseContext";

export default function WorkspaceLayout() {
  const { state } = useCaseContext();

  const currentCase = state.activeCase;

  const isTemplateMode = currentCase?.isTemporary;

  const [detailsCollapsed, setDetailsCollapsed] = useState(false);

  const [templatesCollapsed, setTemplatesCollapsed] = useState(false);

  return (
    <div className="flex h-full overflow-hidden">
      {!isTemplateMode && (
        <Panel
          title="Case Details"
          width={340}
          collapsed={detailsCollapsed}
          onToggle={() => setDetailsCollapsed((v) => !v)}
        >
          <CaseDetailsPanel />
        </Panel>
      )}

      <Panel
        title={isTemplateMode ? "Template Library" : "Templates"}
        width={isTemplateMode ? 360 : 300}
        collapsed={templatesCollapsed}
        onToggle={() => setTemplatesCollapsed((v) => !v)}
      >
        <TemplatesPanel />
      </Panel>

      <section className="flex min-w-0 flex-1 overflow-hidden bg-[#050505] pl-4">
        <OutputPanel />
      </section>
    </div>
  );
}
