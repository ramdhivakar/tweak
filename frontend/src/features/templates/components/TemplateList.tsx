import { useTemplate } from "../context/TemplateContext";

export default function TemplateList() {
  const {
    filteredTemplates,
    selected,
    setSelected,
  } = useTemplate();

  return (
    <div className="space-y-2">
      {filteredTemplates.map((t) => (
        <button
          key={t.id}
          onClick={() => setSelected(t)}
          className={`w-full rounded-xl border p-3 text-left transition ${
            selected?.id === t.id
              ? "border-[#8E2434] bg-[#141414]"
              : "border-[#1A1A1A] hover:bg-[#101010]"
          }`}
        >
          <div className="font-medium text-white">
            {t.title}
          </div>

          <div className="mt-1 text-xs text-neutral-500">
            {t.category}
          </div>
        </button>
      ))}
    </div>
  );
}