import { FileText } from "lucide-react";

import { Button } from "@/components/ui/button";

import TemplateSearch from "@/features/templates/components/TemplateSearch";
import { useTemplate } from "@/features/templates/context/TemplateContext";
import { useCaseContext } from "@/features/case/context/CaseContext";
import { useEditor } from "@/features/editor/context/EditorContext";

export default function TemplatesPanel() {
  const { filteredTemplates } = useTemplate();
const { setSubject, setBody } = useEditor();
  const { state } = useCaseContext();

  const currentCase = state.activeCase;

  function applyTemplate(template: {
  title: string;
  body: string;
}) {
  if (!currentCase) return;

  const text = template.body
    .replaceAll("{{caseId}}", currentCase.caseId ?? "")
    .replaceAll("{{customer}}", currentCase.customerName ?? "")
    .replaceAll("{{customerName}}", currentCase.customerName ?? "")
    .replaceAll("{{companyName}}", currentCase.companyName ?? "")
    .replaceAll("{{product}}", currentCase.product ?? "")
    .replaceAll("{{issue}}", currentCase.issue ?? "")
    .replaceAll("{{engineer}}", "Support Engineer");

  setSubject(template.title);
  setBody(text);
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
        <FileText
          size={15}
          className="text-[#8E2434] flex-shrink-0"
        />

        <span className="truncate text-sm font-medium text-white">
          {template.title}
        </span>
      </div>

      {/* <p className="mt-1 text-[11px] text-neutral-500">
        {template.category}
      </p> */}
    </div>

    <Button
      size="sm"
      onClick={() => applyTemplate(template)}
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