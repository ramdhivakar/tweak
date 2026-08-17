import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { FirstInteraction } from "../types/firstInteraction";
import type { FirstInteractionAIResult } from "../types/firstInteractionAI";

interface FirstInteractionContextValue {
  data: FirstInteraction;

  updateField: <K extends keyof FirstInteraction>(
    field: K,
    value: FirstInteraction[K],
  ) => void;

  reset: () => void;

  aiResult: FirstInteractionAIResult | null;

  setAIResult: (
    result: FirstInteractionAIResult | null,
  ) => void;

  aiSource: "case" | "transcript" | null;

  setAISource: (
    source: "case" | "transcript" | null,
  ) => void;

  applyAIResult: (
    result: FirstInteractionAIResult,
  ) => void;
}

const initialData: FirstInteraction = {
  connectedTime: "",
  contactMode: "Microsoft Teams",
  troubleshootingSteps: "",
  resolutionSummary: "",
  status: "Pending Support",
  logsCollected: false,
  logFindings: "",
  attachments: [],
};

const FirstInteractionContext =
  createContext<FirstInteractionContextValue | null>(
    null,
  );

export function FirstInteractionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [data, setData] =
    useState<FirstInteraction>(initialData);

  const [aiResult, setAIResult] =
    useState<FirstInteractionAIResult | null>(null);

  const [aiSource, setAISource] = useState<
    "case" | "transcript" | null
  >(null);

  function updateField<K extends keyof FirstInteraction>(
    field: K,
    value: FirstInteraction[K],
  ) {
    setData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  /*
   * Apply the complete AI result to the
   * First Interaction form.
   *
   * This is the bridge:
   *
   * Groq
   *   ↓
   * AI Result
   *   ↓
   * FirstInteractionContext
   *   ↓
   * FirstInteractionForm
   */
  function applyAIResult(
    result: FirstInteractionAIResult,
  ) {
    console.log(
      "Applying First Interaction AI result:",
      result,
    );

    setAIResult(result);

    setData((current) => ({
      ...current,

      connectedTime:
        result.connectedTime ?? "",

      contactMode:
        result.contactMode || "Microsoft Teams",

      troubleshootingSteps:
        result.troubleshootingSteps ?? "",

      resolutionSummary:
        result.resolutionSummary ?? "",

      status:
        result.status || "Pending Support",

      logsCollected:
        Boolean(result.logsCollected),

      logFindings:
        result.logFindings ?? "",
    }));
  }

  function reset() {
    setData(initialData);

    setAIResult(null);

    setAISource(null);
  }

  const value = useMemo(
    () => ({
      data,
      updateField,
      reset,

      aiResult,
      setAIResult,

      aiSource,
      setAISource,

      applyAIResult,
    }),
    [
      data,
      aiResult,
      aiSource,
    ],
  );

  return (
    <FirstInteractionContext.Provider
      value={value}
    >
      {children}
    </FirstInteractionContext.Provider>
  );
}

export function useFirstInteraction() {
  const context = useContext(
    FirstInteractionContext,
  );

  if (!context) {
    throw new Error(
      "useFirstInteraction must be used inside FirstInteractionProvider",
    );
  }

  return context;
}