import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { templates } from "../data/templates";
import type { Template } from "../types/template";

interface TemplateContextType {
  templates: Template[];
  search: string;
  setSearch: (value: string) => void;

  selected: Template | null;
  setSelected: (template: Template | null) => void;

  filteredTemplates: Template[];
}

const TemplateContext = createContext<TemplateContextType | null>(null);

export function TemplateProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [search, setSearch] = useState("");

  const [selected, setSelected] =
    useState<Template | null>(null);

  const filteredTemplates = useMemo(() => {
    return templates.filter((t) => {
      const q = search.toLowerCase();

      return (
        t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    });
  }, [search]);

  return (
    <TemplateContext.Provider
      value={{
        templates,
        search,
        setSearch,
        selected,
        setSelected,
        filteredTemplates,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplate() {
  const context = useContext(TemplateContext);

  if (!context)
    throw new Error("TemplateProvider missing");

  return context;
}