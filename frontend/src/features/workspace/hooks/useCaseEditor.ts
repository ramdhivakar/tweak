import { useCaseContext } from "@/features/case/context/CaseContext";

export function useCaseEditor() {
  const { state, dispatch } = useCaseContext();

  const currentCase = state.activeCase;

  function updateField(field: string, value: unknown) {
    if (!currentCase) return;

    dispatch({
      type: "UPDATE_CASE",
      payload: {
        id: currentCase.id,
        updates: {
          [field]: value,
        },
      },
    });
  }

  return {
    currentCase,
    updateField,
  };
}