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

  const { state } = useCaseContext();

  const currentCase = state.activeCase;

  function handleUseAI() {
    setAiOpen(true);
    onUseAI();
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="flex h-[90vh] w-[96vw] max-w-5xl flex-col overflow-hidden rounded-3xl border border-[#1A1A1A] bg-[#050505] p-0 shadow-2xl">
          <DialogHeader className="flex-shrink-0 border-b border-[#1A1A1A] bg-[#070707] px-8 py-6">
            <DialogTitle className="text-xl font-semibold tracking-tight text-white">
              First Interaction
            </DialogTitle>

            <p className="text-sm text-neutral-500">
              Capture the details from the customer interaction.
            </p>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-8 py-7">
            <FirstInteractionForm />
          </div>

          <div className="flex flex-shrink-0 items-center justify-between border-t border-[#1A1A1A] bg-[#070707] px-8 py-5">
            <Button
              type="button"
              variant="ghost"
              onClick={handleUseAI}
              className="gap-2 text-neutral-400 transition hover:bg-[#8E2434]/10 hover:text-[#8E2434]"
            >
              <Sparkles className="h-4 w-4" />
              Use AI
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
        onUploadTranscript={() => {
          console.log("Upload transcript");
        }}
        onUseCaseDetails={() => {
          console.log("Use case details", currentCase);
        }}
      />
    </>
  );
}