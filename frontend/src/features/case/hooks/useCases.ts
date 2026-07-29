import { useState } from "react";

import type { Case } from "../types/case";
import { getCases } from "../storage/localStorage";

export function useCases() {
  const [cases, setCases] = useState<Case[]>(() => getCases());

  return {
    cases,
    setCases,
  };
}
