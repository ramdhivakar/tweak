import { useState } from "react";

import { useTemplate } from "../context/TemplateContext";
import FirstInteractionDialog from "@/features/first-interaction/components/FirstInteractionDialog";

export default function TemplateList() {
  const { filteredTemplates, selected, setSelected } = useTemplate();

  const [firstInteractionOpen, setFirstInteractionOpen] = useState(false);

  function handleTemplateClick(template: (typeof filteredTemplates)[number]) {
    setSelected(template);

    if (template.id === "first-interaction") {
      setFirstInteractionOpen(true);
    }
  }

  return (
    <>
      <div className="space-y-2">
        {filteredTemplates.map((t) => (
          <button
            key={t.id}
            onClick={() => handleTemplateClick(t)}
            className={`w-full rounded-xl border p-3 text-left transition ${
              selected?.id === t.id
                ? "border-[#8E2434] bg-[#141414]"
                : "border-[#1A1A1A] hover:bg-[#101010]"
            }`}
          >
            <div className="font-medium text-white">{t.title}</div>

            <div className="mt-1 text-xs text-neutral-500">
              {t.category}
            </div>
          </button>
        ))}
      </div>

      <FirstInteractionDialog
        open={firstInteractionOpen}
        onOpenChange={setFirstInteractionOpen}
        onUseAI={() => {
          console.log("First Interaction AI");
        }}
        onGenerate={() => {
          console.log("Generate First Interaction");
        }}
      />
    </>
  );
}