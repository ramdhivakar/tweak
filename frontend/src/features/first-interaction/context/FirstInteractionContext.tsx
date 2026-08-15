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
  setAIResult: (result: FirstInteractionAIResult | null) => void;

  aiSource: "case" | "transcript" | null;
  setAISource: (source: "case" | "transcript" | null) => void;

  applyAIResult: () => void;
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
  createContext<FirstInteractionContextValue | null>(null);

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

  function applyAIResult() {
    if (!aiResult) return;

    setData((current) => ({
      ...current,

      connectedTime: aiResult.connectedTime,
      contactMode: aiResult.contactMode,
      troubleshootingSteps:
        aiResult.troubleshootingSteps,
      resolutionSummary:
        aiResult.resolutionSummary,
      status: aiResult.status,
      logsCollected:
        aiResult.logsCollected,
      logFindings:
        aiResult.logFindings,
    }));

    setAIResult(null);
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
    [data, aiResult, aiSource],
  );

  return (
    <FirstInteractionContext.Provider value={value}>
      {children}
    </FirstInteractionContext.Provider>
  );
}

export function useFirstInteraction() {
  const context = useContext(FirstInteractionContext);

  if (!context) {
    throw new Error(
      "useFirstInteraction must be used inside FirstInteractionProvider",
    );
  }

  return context;
}