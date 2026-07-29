import type { Case } from "../types/case";

const STORAGE_KEY = "support-workspace-cases";

export function getCases(): Case[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveCases(cases: Case[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
}

export function addCase(newCase: Case) {
  const cases = getCases();

  saveCases([newCase, ...cases]);
}

export function deleteCase(id: string) {
  const cases = getCases().filter((c) => c.id !== id);

  saveCases(cases);
}
