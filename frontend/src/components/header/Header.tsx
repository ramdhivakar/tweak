import { useCaseContext } from "@/features/case/context/CaseContext";

export default function Header() {
  const { dispatch } = useCaseContext();

  return (
    <div className="flex h-full items-center justify-between px-6">
      <button
        onClick={() =>
          dispatch({
            type: "SET_ACTIVE_CASE",
            payload: null,
          })
        }
        className="text-left transition-opacity hover:opacity-80"
      >
        <h1 className="text-lg font-semibold text-white">Tweak</h1>

        <p className="text-xs text-slate-400">Enterprise Support Assistant</p>
      </button>

      <div className="text-sm text-slate-400">Local Storage</div>
    </div>
  );
}
