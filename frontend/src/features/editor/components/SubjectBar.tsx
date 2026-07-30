import { Input } from "@/components/ui/input";
import { useEditor } from "../context/EditorContext";

export default function SubjectBar() {
  const { draft, setSubject } = useEditor();

  return (
    <div className="border-b border-[#1A1A1A] p-4">
      <Input
        placeholder="Email subject..."
        value={draft.subject}
        onChange={(e) => setSubject(e.target.value)}
        className="border-0 bg-transparent text-base font-medium shadow-none focus-visible:ring-0"
      />
    </div>
  );
}