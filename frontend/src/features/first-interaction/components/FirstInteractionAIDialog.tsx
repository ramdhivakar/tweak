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

const API_URL = "http://127.0.0.1:8000";

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

  function handleUploadClick() {
    if (loading) return;

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
      setError("Please select a DOCX transcript file.");

      event.target.value = "";

      return;
    }

    setError(null);

    setTranscriptFile(file);

    setCaseDetailsSelected(false);

    onUploadTranscript();
  }

  function clearTranscript() {
    if (loading) return;

    setTranscriptFile(null);

    setError(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

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
   * Analyze DOCX transcript.
   *
   * The transcript endpoint accepts multipart/form-data
   * because the backend needs the actual DOCX file.
   */
  async function analyzeTranscript() {
    if (!transcriptFile) {
      throw new Error("Please select a transcript first.");
    }

    const formData = new FormData();

    formData.append("file", transcriptFile);

    console.log(
      "Sending transcript to backend:",
      transcriptFile.name,
    );

    const response = await fetch(
      `${API_URL}/api/transcript/extract`,
      {
        method: "POST",
        body: formData,
      },
    );

    const responseText =
      await response.text();

    console.log(
      "Transcript AI HTTP response:",
      {
        status: response.status,
        ok: response.ok,
        body: responseText,
      },
    );

    if (!response.ok) {
      throw new Error(
        `Transcript AI request failed (${response.status}): ${responseText}`,
      );
    }

    if (!responseText.trim()) {
      throw new Error(
        "Transcript AI returned an empty response.",
      );
    }

    let result: any;

    try {
      result = JSON.parse(responseText);
    } catch {
      throw new Error(
        "Transcript AI returned invalid JSON.",
      );
    }

    if (!result?.success) {
      throw new Error(
        result?.error ||
          "Unable to analyze transcript.",
      );
    }

    if (!result.aiResult) {
      throw new Error(
        "Transcript AI did not return a structured result.",
      );
    }

    console.log(
      "Transcript AI result:",
      result.aiResult,
    );

    return result.aiResult;
  }

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

      /*
       * --------------------------------------------------
       * TRANSCRIPT FLOW
       * --------------------------------------------------
       */

      if (transcriptFile) {
        console.log(
          "Generating First Interaction from transcript:",
          {
            caseId: currentCase.caseId,
            transcript: transcriptFile.name,
          },
        );

        const result =
          await analyzeTranscript();

        /*
         * Mark the source as transcript.
         */
        setAISource("transcript");

        /*
         * Apply the structured AI result directly
         * into FirstInteractionContext.
         */
        applyAIResult(result);

        /*
         * Close only the AI selection dialog.
         *
         * The main First Interaction dialog remains open.
         */
        onOpenChange(false);

        return;
      }

      /*
       * --------------------------------------------------
       * EXISTING CASE FLOW
       * --------------------------------------------------
       */

      console.log(
        "Generating First Interaction from existing case:",
        {
          caseId: currentCase.caseId,
          firstInteractionData: data,
        },
      );

      const result =
        await generateFirstInteractionAI({
          source: "case",
          currentCase,
          firstInteractionData: data,
          transcriptFile: null,
        });

      console.log(
        "First Interaction AI result:",
        result,
      );

      /*
       * Mark the source as case.
       */
      setAISource("case");

      /*
       * Apply the AI result into the existing
       * First Interaction form.
       */
      applyAIResult(result);

      /*
       * Close only the AI selection dialog.
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