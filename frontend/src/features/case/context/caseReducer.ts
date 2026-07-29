import type { Case } from "../types/case";

export interface CaseState {
  cases: Case[];
  activeCase: Case | null;
}

export type CaseAction =
  | { type: "SET_CASES"; payload: Case[] }
  | { type: "ADD_CASE"; payload: Case }
  | { type: "DELETE_CASE"; payload: string }
  | { type: "SET_ACTIVE_CASE"; payload: string };

export function caseReducer(state: CaseState, action: CaseAction): CaseState {
  switch (action.type) {
    case "SET_CASES":
      return {
        ...state,
        cases: action.payload,
      };

    case "ADD_CASE":
      return {
        ...state,
        cases: [action.payload, ...state.cases],
        activeCase: null,
      };

    case "DELETE_CASE": {
      const updatedCases = state.cases.filter((c) => c.id !== action.payload);

      return {
        ...state,
        cases: updatedCases,
        activeCase:
          state.activeCase?.id === action.payload
            ? (updatedCases[0] ?? null)
            : state.activeCase,
      };
    }

    case "SET_ACTIVE_CASE":
      return {
        ...state,
        activeCase: state.cases.find((c) => c.id === action.payload) ?? null,
      };

    default:
      return state;
  }
}
