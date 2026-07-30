import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface EditableFieldProps {
  label: string;
  value?: string;
  editing: boolean;
  multiline?: boolean;
  onChange: (value: string) => void;
}

export default function EditableField({
  label,
  value,
  editing,
  multiline,
  onChange,
}: EditableFieldProps) {
  return (
    <div className="space-y-2">
      <p className="text-[11px] uppercase tracking-widest text-neutral-500">
        {label}
      </p>

      {editing ? (
        multiline ? (
          <Textarea
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-24"
          />
        ) : (
          <Input
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
        )
      ) : (
        <div
          className={cn(
            "min-h-10 rounded-lg border border-[#1A1A1A] bg-[#0b0b0b] px-3 py-2 text-sm text-white"
          )}
        >
          {value || "-"}
        </div>
      )}
    </div>
  );
}