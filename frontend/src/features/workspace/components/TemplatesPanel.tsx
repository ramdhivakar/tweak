import { useState } from "react";
import { FileText } from "lucide-react";

import { Button } from "@/components/ui/button";

import TemplateSearch from "@/features/templates/components/TemplateSearch";
import { useTemplate } from "@/features/templates/context/TemplateContext";
import { useCaseContext } from "@/features/case/context/CaseContext";
import { useEditor } from "@/features/editor/context/EditorContext";
import { templateRegistry } from "@/features/templates/renderers/templateRegistry";

import {
  useFirstInteraction,
} from "@/features/first-interaction/context/FirstInteractionContext";

import FirstInteractionDialog from "@/features/first-interaction/components/FirstInteractionDialog";

export default function TemplatesPanel() {
  const { filteredTemplates, setSelected } = useTemplate();

  const { setSubject, setBody } = useEditor();

  const { state } = useCaseContext();

  const currentCase = state.activeCase;

  const {
    data: firstInteraction,
    reset: resetFirstInteraction,
  } = useFirstInteraction();

  const [firstInteractionOpen, setFirstInteractionOpen] =
    useState(false);

  function useTemplateEmail(template: {
    id: string;
    title: string;
    body: string;
  }) {
    if (!currentCase) return;

    setSelected(template);

    /*
     * First Interaction uses its dedicated workflow.
     */
    if (template.id === "first-interaction") {
      setFirstInteractionOpen(true);
      return;
    }

    /*
     * All other templates continue using
     * the existing renderer architecture.
     */
    const renderer = templateRegistry[template.id];

    if (!renderer) return;

    const output = renderer(currentCase);

    setSubject(template.title);
    setBody(output);
  }

  function generateFirstInteraction() {
    if (!currentCase) return;

    /*
     * Combine the existing Case data with the
     * First Interaction data.
     *
     * We do NOT modify the Case itself.
     */
    const firstInteractionCase = {
      ...currentCase,

      connectedTime:
        firstInteraction.connectedTime ||
        currentCase.connectedTime ||
        "",

      contactMode:
        firstInteraction.contactMode ||
        currentCase.contactMode ||
        "",

      troubleshootingSteps:
        firstInteraction.troubleshootingSteps ||
        "",

      resolutionSummary:
        firstInteraction.resolutionSummary ||
        "",

      status: firstInteraction.status,

      /*
       * Existing renderer expects availableLogs.
       */
      availableLogs: firstInteraction.logsCollected
        ? "Yes"
        : "No",

      /*
       * Existing renderer expects logReview.
       */
      logReview:
        firstInteraction.logFindings || "-",
    };

    const renderer =
      templateRegistry["first-interaction"];

    if (!renderer) return;

    const output = renderer(firstInteractionCase);

    /*
     * Send generated HTML to the existing editor.
     */
    setSubject("First Interaction");
    setBody(output);

    /*
     * Close the First Interaction dialog.
     */
    setFirstInteractionOpen(false);

    /*
     * Reset the interaction form so the next
     * First Interaction starts clean.
     */
    // resetFirstInteraction();
  }

  return (
    <>
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
                      className="shrink-0 text-[#8E2434]"
                    />

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

      <FirstInteractionDialog
        open={firstInteractionOpen}
        onOpenChange={setFirstInteractionOpen}
        onUseAI={() => {
          console.log("First Interaction AI");
        }}
        onGenerate={generateFirstInteraction}
      />
    </>
  );
}