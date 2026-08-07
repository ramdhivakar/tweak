import { FileText } from "lucide-react";

import { Button } from "@/components/ui/button";

import TemplateSearch from "@/features/templates/components/TemplateSearch";
import { useTemplate } from "@/features/templates/context/TemplateContext";
import { useCaseContext } from "@/features/case/context/CaseContext";
import { useEditor } from "@/features/editor/context/EditorContext";
import { templateRegistry } from "@/features/templates/renderers/templateRegistry";
import { buildFirstInteraction } from "@/features/templates/renderers/firstInteraction";

export default function TemplatesPanel() {
  const { filteredTemplates, setSelected } = useTemplate();

  const { setSubject, setBody } = useEditor();

  const { state } = useCaseContext();

  const currentCase = state.activeCase;

  function useTemplateEmail(template: {
    id: string;
    title: string;
    body: string;
  }) {
    if (!currentCase) return;

    setSelected(template);

    const renderer = templateRegistry[template.id];

    if (!renderer) return;

    const output = renderer(currentCase);

    setSubject(template.title);

    setBody(output);
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <TemplateSearch />

      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="rounded-lg border border-[#1A1A1A] bg-[#090909] p-3 transition hover:border-[#8E2434]"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <FileText size={15} className="shrink-0 text-[#8E2434]" />

                  <span className="truncate text-sm font-medium text-white">
                    {template.title}
                  </span>
                </div>
              </div>

              <Button
                size="sm"
                onClick={() => useTemplateEmail(template)}
                className="h-8 rounded-md bg-[#8E2434] px-4 text-xs hover:bg-[#A92C3F]"
              >
                Use
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
