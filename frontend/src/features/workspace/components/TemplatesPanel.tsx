const templates = [
  "First Interaction",
  "Follow-up",
  "Logs Request",
  "Engineering Escalation",
  "Case Closure",
];

export default function TemplatesPanel() {
  return (
    <div className="space-y-2">
      {templates.map((template) => (
        <button
          key={template}
          className="w-full rounded-lg border border-[#1A1A1A] bg-[#0D0D0D] px-3 py-2 text-left text-sm text-neutral-300 transition hover:border-[#8E2434] hover:bg-[#141414]"
        >
          {template}
        </button>
      ))}
    </div>
  );
}
