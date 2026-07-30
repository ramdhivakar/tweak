import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import SubjectBar from "@/features/editor/components/SubjectBar";
import EmailEditor from "@/features/editor/components/EmailEditor";
import { useEditor } from "@/features/editor/context/EditorContext";

export default function OutputPanel() {
  const { clearDraft } = useEditor();

  return (
    <div className="flex h-full flex-col rounded-xl border border-[#1A1A1A] bg-[#090909]">
      {/* Subject */}
      <SubjectBar />

      {/* Actions */}
      <div className="flex items-center justify-end border-b border-[#1A1A1A] px-4 py-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={clearDraft}
          className="gap-2"
        >
          <Trash2 size={16} />
          Clear
        </Button>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-auto">
        <EmailEditor />
      </div>
    </div>
  );
}