import {
  FileText,
  Loader2,
  Sparkles,
  Upload,
} from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { Case } from "@/features/case/types/case";

import { useFirstInteraction } from "../context/FirstInteractionContext";
import { generateFirstInteractionAI } from "../services/firstInteractionAI";

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

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const {
    data,
    applyAIResult,
    setAISource,
  } = useFirstInteraction();

  /*
   * Open file picker.
   */
  function handleUploadClick() {
    if (loading) return;

    fileInputRef.current?.click();
  }

  /*
   * Handle transcript selection.
   */
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
      setError("Please select a DOCX transcript file.");

      event.target.value = "";

      return;
    }

    setError(null);

    setTranscriptFile(file);

    setCaseDetailsSelected(false);

    onUploadTranscript();
  }

  /*
   * Remove transcript.
   */
  function clearTranscript() {
    if (loading) return;

    setTranscriptFile(null);

    setError(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  /*
   * Select Existing Case Details.
   */
  function handleUseCaseDetails() {
    if (loading) return;

    setError(null);

    setCaseDetailsSelected(true);

    setTranscriptFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    onUseCaseDetails();
  }

  /*
   * Send First Interaction + Case data to backend.
   */
  async function handleContinue() {
    if (loading) return;

    if (!currentCase) {
      setError("No active case is available.");
      return;
    }

    if (!transcriptFile && !caseDetailsSelected) {
      setError(
        "Choose Existing Case Details or upload a transcript.",
      );

      return;
    }

    try {
      setLoading(true);
      setError(null);

      const source = transcriptFile
        ? "transcript"
        : "case";

      /*
       * IMPORTANT:
       *
       * `data` contains the values entered in
       * FirstInteractionForm.
       */
      console.log(
        "Generating First Interaction AI:",
        {
          source,
          caseId: currentCase.caseId,

          firstInteractionData: data,

          transcript:
            transcriptFile?.name ?? null,
        },
      );

      const result =
        await generateFirstInteractionAI({
          source,
          currentCase,

          /*
           * THIS WAS MISSING BEFORE.
           */
          firstInteractionData: data,

          transcriptFile,
        });

      console.log(
        "First Interaction AI result:",
        result,
      );

      /*
       * Remember where the AI result came from.
       */
      setAISource(source);

      /*
       * Put AI result into the same context
       * used by FirstInteractionForm.
       */
      applyAIResult(result);

      /*
       * Close ONLY the AI selection dialog.
       *
       * The main First Interaction dialog
       * remains open.
       */
      onOpenChange(false);
    } catch (error) {
      console.error(
        "First Interaction AI failed:",
        error,
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to generate AI suggestions.",
      );
    } finally {
      setLoading(false);
    }
  }

  /*
   * Handle dialog close.
   *
   * Do NOT reset FirstInteractionContext here.
   */
  function handleDialogChange(nextOpen: boolean) {
    if (loading) return;

    onOpenChange(nextOpen);

    if (!nextOpen) {
      setTranscriptFile(null);

      setCaseDetailsSelected(false);

      setError(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  const canContinue =
    !loading &&
    Boolean(
      transcriptFile || caseDetailsSelected,
    );

  return (
    <Dialog
      open={open}
      onOpenChange={handleDialogChange}
    >
      <DialogContent className="w-[92vw] max-w-md rounded-2xl border border-[#1A1A1A] bg-[#070707] p-0 text-white">
        {/* Header */}

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

        {/* Content */}

        <div className="space-y-3 p-6">
          {/* Error */}

          {error && (
            <div className="rounded-xl border border-[#8E2434]/40 bg-[#8E2434]/10 px-4 py-3">
              <p className="text-xs leading-5 text-[#D86A78]">
                {error}
              </p>
            </div>
          )}

          {/* Upload Transcript */}

          {!transcriptFile ? (
            <button
              type="button"
              disabled={loading}
              onClick={handleUploadClick}
              className={`group w-full rounded-xl border p-4 text-left transition ${
                loading
                  ? "cursor-not-allowed border-[#222] bg-[#0B0B0B] opacity-50"
                  : "border-[#222] bg-[#0B0B0B] hover:border-[#8E2434] hover:bg-[#0F0F0F]"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#8E2434]/10 text-[#8E2434]">
                  <FileText className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white">
                    Upload Call Transcript
                  </p>

                  <p className="mt-1 text-xs text-neutral-500">
                    Upload a DOCX transcript for AI
                    analysis.
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
                    {(
                      transcriptFile.size / 1024
                    ).toFixed(1)}{" "}
                    KB
                  </p>
                </div>

                <button
                  type="button"
                  disabled={loading}
                  onClick={clearTranscript}
                  className="text-xs text-neutral-500 transition hover:text-[#8E2434] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Remove
                </button>
              </div>

              <div className="mt-3 rounded-lg border border-[#222] bg-[#090909] px-3 py-2">
                <p className="text-xs text-neutral-500">
                  Transcript selected.
                </p>

                <p className="mt-1 text-xs text-neutral-300">
                  AI will analyze the conversation and
                  prepare First Interaction details.
                </p>
              </div>
            </div>
          )}

          {/* Hidden file input */}

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
            disabled={loading}
            onClick={handleUseCaseDetails}
            className={`group w-full rounded-xl border p-4 text-left transition ${
              caseDetailsSelected
                ? "border-[#8E2434] bg-[#8E2434]/5"
                : loading
                  ? "cursor-not-allowed border-[#222] bg-[#0B0B0B] opacity-50"
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

              {caseDetailsSelected && !loading && (
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
            disabled={loading}
            onClick={() => handleDialogChange(false)}
            className="text-neutral-400 hover:bg-[#141414] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </Button>

          <Button
            type="button"
            disabled={!canContinue}
            onClick={handleContinue}
            className="min-w-[120px] rounded-xl bg-[#8E2434] px-5 text-white hover:bg-[#A92C3F] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : transcriptFile ? (
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