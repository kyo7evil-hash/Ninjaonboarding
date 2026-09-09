import { useCallback, useEffect, useState } from "react";

// Progress for every module lives under one localStorage key. Shape:
//   { "it-policy": { lastStep: 6, completedSteps: [0,1,2], completedAt: null } }
// Every read/write is guarded — a private window, blocked storage, or a thumbnail
// context can make localStorage throw or return null, and the app must still work.

const KEY = "nv-onboarding-v1";

function readAll() {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeAll(data) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable — progress is best-effort only */
  }
}

const EMPTY = { lastStep: 0, completedSteps: [], completedAt: null };

export function readModuleProgress(moduleId) {
  const entry = readAll()[moduleId];
  if (!entry || typeof entry !== "object") return { ...EMPTY };
  return {
    lastStep: Number.isInteger(entry.lastStep) ? entry.lastStep : 0,
    completedSteps: Array.isArray(entry.completedSteps) ? entry.completedSteps : [],
    completedAt: entry.completedAt || null,
  };
}

// Notify listeners in the same tab (the `storage` event only fires cross-tab).
const listeners = new Set();
function emit() {
  listeners.forEach((fn) => fn());
}

export function resetAllProgress() {
  writeAll({});
  emit();
}

export function resetModuleProgress(moduleId) {
  const all = readAll();
  delete all[moduleId];
  writeAll(all);
  emit();
}

export function useProgress(moduleId) {
  const [state, setState] = useState(() => readModuleProgress(moduleId));

  useEffect(() => {
    const refresh = () => setState(readModuleProgress(moduleId));
    refresh();
    listeners.add(refresh);
    window.addEventListener("storage", refresh);
    return () => {
      listeners.delete(refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [moduleId]);

  const persist = useCallback(
    (next) => {
      const all = readAll();
      all[moduleId] = next;
      writeAll(all);
      setState(next);
      emit();
    },
    [moduleId]
  );

  const markStep = useCallback(
    (index) => {
      const current = readModuleProgress(moduleId);
      const completed = new Set(current.completedSteps);
      completed.add(index);
      persist({
        ...current,
        lastStep: index,
        completedSteps: [...completed].sort((a, b) => a - b),
      });
    },
    [moduleId, persist]
  );

  const markComplete = useCallback(() => {
    const current = readModuleProgress(moduleId);
    persist({ ...current, completedAt: current.completedAt || new Date().toISOString() });
  }, [moduleId, persist]);

  const reset = useCallback(() => resetModuleProgress(moduleId), [moduleId]);

  return { ...state, markStep, markComplete, reset };
}
