import { Clipboard, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import EmailEditor from "@/features/editor/components/EmailEditor";
import { useEditor } from "@/features/editor/context/EditorContext";
import { useTemplate } from "@/features/templates/context/TemplateContext";

export default function OutputPanel() {
  const { clearDraft, draft } = useEditor();
  const { selected } = useTemplate();

  async function copy() {
    await navigator.clipboard.writeText(draft.body.replace(/<[^>]+>/g, ""));
  }

  return (
    <div className="flex h-full w-full min-w-0 flex-1 flex-col rounded-xl border border-[#1A1A1A] bg-[#090909]">
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b border-[#1A1A1A] px-5">
        <h2 className="truncate text-lg font-semibold text-white">
          {selected?.title || "Select a Template"}
        </h2>

        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={copy}
            className="
  h-9
  w-9
  rounded-lg
  text-neutral-400
  transition-all
  duration-200
  hover:bg-[#8E2434]/10
  hover:text-[#8E2434]
"
          >
            <Clipboard size={17} />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            onClick={clearDraft}
            className="
  h-9
  w-9
  rounded-lg
  text-neutral-400
  transition-all
  duration-200
  hover:bg-[#8E2434]/10
  hover:text-[#8E2434]
"
          >
            <Trash2 size={17} />
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <EmailEditor />
      </div>
    </div>
  );
}
