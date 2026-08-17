import { Sparkles } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useCaseContext } from "@/features/case/context/CaseContext";
import { useFirstInteraction } from "../context/FirstInteractionContext";

import { generateFirstInteractionAI } from "../services/firstInteractionAI";

import FirstInteractionAIDialog from "./FirstInteractionAIDialog";
import FirstInteractionForm from "./FirstInteractionForm";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUseAI: () => void;
  onGenerate: () => void;
}

export default function FirstInteractionDialog({
  open,
  onOpenChange,
  onUseAI,
  onGenerate,
}: Props) {
  const [aiOpen, setAiOpen] = useState(false);
  const [aiLoading, setAILoading] = useState(false);
  const [aiError, setAIError] = useState<string | null>(null);

  const { state } = useCaseContext();

  const {
    setAIResult,
    setAISource,
    updateField,
  } = useFirstInteraction();

  const currentCase = state.activeCase;

  function handleUseAI() {
    setAIError(null);
    setAiOpen(true);
    onUseAI();
  }

  async function handleUseCaseDetails() {
    if (!currentCase) {
      setAIError("No active case is available.");
      return;
    }

    try {
      setAILoading(true);
      setAIError(null);

      const result = await generateFirstInteractionAI({
        source: "case",
        currentCase,
      });

      console.log("First Interaction AI result:", result);

      setAIResult(result);
      setAISource("case");

      /*
       * Populate the existing First Interaction form.
       *
       * The agent can now review/edit these values
       * before generating the final output.
       */

      updateField("connectedTime", result.connectedTime);
      updateField("contactMode", result.contactMode);
      updateField(
        "troubleshootingSteps",
        result.troubleshootingSteps,
      );
      updateField(
        "resolutionSummary",
        result.resolutionSummary,
      );
      updateField("status", result.status);
      updateField("logsCollected", result.logsCollected);
      updateField("logFindings", result.logFindings);

      /*
       * Close the AI selection dialog.
       */
      setAiOpen(false);

      /*
       * Keep First Interaction open.
       * The agent should see and edit the AI-generated values.
       */
    } catch (error) {
      console.error(
        "First Interaction AI failed:",
        error,
      );

      setAIError(
        error instanceof Error
          ? error.message
          : "Unable to generate AI suggestions.",
      );
    } finally {
      setAILoading(false);
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={onOpenChange}
      >
        <DialogContent className="flex h-[90vh] w-[96vw] max-w-5xl flex-col overflow-hidden rounded-3xl border border-[#1A1A1A] bg-[#050505] p-0 shadow-2xl">
          <DialogHeader className="flex-shrink-0 border-b border-[#1A1A1A] bg-[#070707] px-8 py-6">
            <DialogTitle className="text-xl font-semibold tracking-tight text-white">
              First Interaction
            </DialogTitle>

            <p className="text-sm text-neutral-500">
              Capture the details from the customer interaction.
            </p>
          </DialogHeader>

          {aiError && (
            <div className="mx-8 mt-5 rounded-xl border border-[#8E2434]/40 bg-[#8E2434]/10 px-4 py-3">
              <p className="text-xs text-[#D86A78]">
                {aiError}
              </p>
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-8 py-7">
            <FirstInteractionForm />
          </div>

          <div className="flex flex-shrink-0 items-center justify-between border-t border-[#1A1A1A] bg-[#070707] px-8 py-5">
            <Button
              type="button"
              variant="ghost"
              onClick={handleUseAI}
              disabled={aiLoading}
              className="gap-2 text-neutral-400 transition hover:bg-[#8E2434]/10 hover:text-[#8E2434]"
            >
              <Sparkles className="h-4 w-4" />
              {aiLoading ? "Generating..." : "Use AI"}
            </Button>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="rounded-xl border-[#303030] bg-transparent text-neutral-300 hover:bg-[#111] hover:text-white"
              >
                Cancel
              </Button>

              <Button
                type="button"
                onClick={onGenerate}
                className="rounded-xl bg-[#8E2434] px-6 text-white hover:bg-[#A92C3F]"
              >
                Generate Output
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <FirstInteractionAIDialog
        open={aiOpen}
        onOpenChange={setAiOpen}
        currentCase={currentCase}
        loading={aiLoading}
        onUploadTranscript={() => {
          console.log("Upload transcript");
        }}
        onUseCaseDetails={handleUseCaseDetails}
      />
    </>
  );
}