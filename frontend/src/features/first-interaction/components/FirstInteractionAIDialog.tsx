import { FileText, Sparkles, Upload } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useFirstInteraction } from "../context/FirstInteractionContext";
import { generateFirstInteractionAI } from "../services/firstInteractionAI";

import type { Case } from "@/features/case/types/case";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentCase: Case | null;
  onUploadTranscript: () => void;
  onUseCaseDetails: () => void;
}

export default function FirstInteractionAIDialog({
  open,
  onOpenChange,
  currentCase,
  onUploadTranscript,
  onUseCaseDetails,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [transcriptFile, setTranscriptFile] =
    useState<File | null>(null);

  const [caseDetailsSelected, setCaseDetailsSelected] =
    useState(false);

  const {
    applyAIResult,
    setAISource,
  } = useFirstInteraction();

  function handleUploadClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    const isDocx =
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.name.toLowerCase().endsWith(".docx");

    if (!isDocx) {
      return;
    }

    setTranscriptFile(file);
    setCaseDetailsSelected(false);

    onUploadTranscript();
  }

  function clearTranscript() {
    setTranscriptFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleUseCaseDetails() {
    setCaseDetailsSelected(true);
    setTranscriptFile(null);

    onUseCaseDetails();
  }

  async function handleContinue() {
    if (!currentCase) return;

    /*
     * Temporary mock AI result.
     *
     * Later this will be replaced with:
     *
     * transcript → backend → LLM
     *
     * or:
     *
     * case details → backend → LLM
     */
    const result = await generateFirstInteractionAI({
  source: transcriptFile ? "transcript" : "case",
  currentCase,
  transcriptFile,
});

    if (transcriptFile) {
      setAISource("transcript");
    } else if (caseDetailsSelected) {
      setAISource("case");
    } else {
      return;
    }

    /*
     * Apply the generated result directly to the
     * First Interaction form.
     */
    applyAIResult(result);

    /*
     * Close only the AI selection dialog.
     *
     * The parent First Interaction dialog remains open
     * so the agent can review/edit the generated values.
     */
    onOpenChange(false);
  }

  const canContinue =
    Boolean(transcriptFile) || caseDetailsSelected;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[92vw] max-w-md rounded-2xl border border-[#1A1A1A] bg-[#070707] p-0 text-white">
        <DialogHeader className="border-b border-[#1A1A1A] px-6 py-5">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <Sparkles className="h-5 w-5 text-[#8E2434]" />
            Use AI
          </DialogTitle>

          <p className="text-sm text-neutral-500">
            Choose how Tweak should build the First
            Interaction details.
          </p>
        </DialogHeader>

        <div className="space-y-3 p-6">
          {/* Upload Transcript */}

          {!transcriptFile ? (
            <button
              type="button"
              onClick={handleUploadClick}
              className={`group w-full rounded-xl border p-4 text-left transition ${
                !caseDetailsSelected
                  ? "border-[#222] bg-[#0B0B0B] hover:border-[#8E2434] hover:bg-[#0F0F0F]"
                  : "border-[#222] bg-[#0B0B0B] hover:border-[#8E2434] hover:bg-[#0F0F0F]"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#8E2434]/10 text-[#8E2434]">
                  <FileText className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    Upload Call Transcript
                  </p>

                  <p className="mt-1 text-xs text-neutral-500">
                    Upload a DOCX transcript for AI analysis.
                  </p>
                </div>
              </div>
            </button>
          ) : (
            <div className="rounded-xl border border-[#8E2434]/40 bg-[#8E2434]/5 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#8E2434]/10 text-[#8E2434]">
                  <FileText className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">
                    {transcriptFile.name}
                  </p>

                  <p className="mt-1 text-xs text-neutral-500">
                    {(transcriptFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>

                <button
                  type="button"
                  onClick={clearTranscript}
                  className="text-xs text-neutral-500 transition hover:text-[#8E2434]"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Existing Case Details */}

          <button
            type="button"
            onClick={handleUseCaseDetails}
            className={`group w-full rounded-xl border p-4 text-left transition ${
              caseDetailsSelected
                ? "border-[#8E2434] bg-[#8E2434]/5"
                : "border-[#222] bg-[#0B0B0B] hover:border-[#8E2434] hover:bg-[#0F0F0F]"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#8E2434]/10 text-[#8E2434]">
                <Sparkles className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">
                  Use Existing Case Details
                </p>

                <p className="mt-1 text-xs text-neutral-500">
                  Use the information already entered in
                  this case.
                </p>
              </div>

              {caseDetailsSelected && (
                <span className="text-xs font-medium text-[#8E2434]">
                  SELECTED
                </span>
              )}
            </div>
          </button>
        </div>

        {/* Footer */}

        <div className="flex items-center justify-between border-t border-[#1A1A1A] px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-neutral-400 hover:bg-[#141414] hover:text-white"
          >
            Cancel
          </Button>

          <Button
            type="button"
            disabled={!canContinue}
            onClick={handleContinue}
            className="rounded-xl bg-[#8E2434] px-5 text-white hover:bg-[#A92C3F] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {transcriptFile ? (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Analyze Transcript
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}