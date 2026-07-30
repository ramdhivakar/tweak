import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";

import { caseReducer, type CaseAction, type CaseState } from "./caseReducer";
import { getCases, saveCases } from "../storage/localStorage";

const savedCases = getCases();

const initialState = {
  cases: savedCases,
  activeCase: null,
};

const CaseContext = createContext<{
  state: CaseState;
  dispatch: React.Dispatch<CaseAction>;
} | null>(null);

export function CaseProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(caseReducer, initialState);

  useEffect(() => {
    saveCases(state.cases);
  }, [state.cases]);

  return (
    <CaseContext.Provider value={{ state, dispatch }}>
      {children}
    </CaseContext.Provider>
  );
}

export function useCaseContext() {
  const context = useContext(CaseContext);

  if (!context) {
    throw new Error("useCaseContext must be used inside CaseProvider");
  }

  return context;
}
