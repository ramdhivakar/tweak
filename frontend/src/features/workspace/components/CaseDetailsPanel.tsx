import { Button } from "@/components/ui/button";
import { useState } from "react";

import CustomerSection from "./details/CustomerSection";
import IssueSection from "./details/IssueSection";
import ProductSection from "./details/ProductSection";
import SupportSection from "./details/SupportSection";
import { useCaseEditor } from "../hooks/useCaseEditor";

export default function CaseDetailsPanel() {
  const { currentCase, updateField } = useCaseEditor();

  const [editing, setEditing] = useState(false);

  if (!currentCase) {
    return (
      <div className="flex h-full items-center justify-center text-neutral-500">
        Select a case
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Case Details
        </h2>

        <Button
          size="sm"
          variant={editing ? "default" : "outline"}
          onClick={() => setEditing((x) => !x)}
        >
          {editing ? "Done" : "Edit"}
        </Button>
      </div>

      <div className="space-y-4 overflow-y-auto pr-1">
        <CustomerSection
          editing={editing}
          data={currentCase}
          update={updateField}
        />

        <ProductSection
          editing={editing}
          data={currentCase}
          update={updateField}
        />

        <SupportSection
          editing={editing}
          data={currentCase}
          update={updateField}
        />

        <IssueSection
          editing={editing}
          data={currentCase}
          update={updateField}
        />
      </div>
    </div>
  );
}