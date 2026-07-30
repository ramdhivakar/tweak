import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { EmailDraft } from "../types/editor.types";

interface EditorContextType {
  draft: EmailDraft;
  setSubject: (subject: string) => void;
  setBody: (body: string) => void;
  clearDraft: () => void;
}

const EditorContext = createContext<EditorContextType | null>(null);

export function EditorProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [draft, setDraft] = useState<EmailDraft>({
    subject: "",
    body: "",
  });

  const setSubject = (subject: string) =>
    setDraft((prev) => ({
      ...prev,
      subject,
    }));

  const setBody = (body: string) =>
    setDraft((prev) => ({
      ...prev,
      body,
    }));

  const clearDraft = () =>
    setDraft({
      subject: "",
      body: "",
    });

  return (
    <EditorContext.Provider
      value={{
        draft,
        setSubject,
        setBody,
        clearDraft,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error("useEditor must be used within EditorProvider");
  }

  return context;
}