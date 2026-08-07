import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { CaseField } from "../../data/caseFields";

interface Props {
  field: CaseField;
  value: string;
  onChange: (value: string) => void;
}

export default function DynamicField({ field, value, onChange }: Props) {
  switch (field.type) {
    case "textarea":
      return (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-neutral-300">
            {field.label}
          </Label>

          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className="
              min-h-40
              rounded-xl
              border-[#232323]
              bg-[#0A0A0A]
              text-white
              placeholder:text-neutral-600
              focus-visible:border-[#8E2434]
              focus-visible:ring-1
              focus-visible:ring-[#8E2434]
            "
          />
        </div>
      );

    case "select":
      return (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-neutral-300">
            {field.label}
          </Label>

          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="
              h-11
              w-full
              rounded-xl
              border
              border-[#232323]
              bg-[#0A0A0A]
              px-3
              text-white
              outline-none
              focus:border-[#8E2434]
            "
          >
            <option value="">Select...</option>

            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );

    case "switch":
      return (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-neutral-300">
            {field.label}
          </Label>

          <div
            className="flex h-11 cursor-pointer items-center justify-between rounded-xl border border-[#232323] bg-[#0A0A0A] px-4 transition-colors hover:border-[#8E2434]"
            onClick={() => onChange(value === "true" ? "false" : "true")}
          >
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-500">
              {value === "true" ? "YES" : "NA"}
            </span>

            <Switch
              checked={value === "true"}
              onCheckedChange={(checked) => onChange(String(checked))}
              onClick={(e) => e.stopPropagation()}
              className="data-[state=checked]:bg-[#8E2434]"
            />
          </div>
        </div>
      );

    case "email-list":
      return (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-neutral-300">
            {field.label}
          </Label>

          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="customer@email.com"
            className="
    h-11
    rounded-xl
    border-[#232323]
    bg-[#0A0A0A]
    text-white
    placeholder:text-neutral-600
    focus-visible:border-[#8E2434]
    focus-visible:ring-1
    focus-visible:ring-[#8E2434]
    focus-visible:ring-offset-0
  "
          />
        </div>
      );

    case "phone-list":
      return (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-neutral-300">
            {field.label}
          </Label>

          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="+91 9876543210"
            className="
    h-11
    rounded-xl
    border-[#232323]
    bg-[#0A0A0A]
    text-white
    placeholder:text-neutral-600
    focus-visible:border-[#8E2434]
    focus-visible:ring-1
    focus-visible:ring-[#8E2434]
    focus-visible:ring-offset-0
  "
          />
        </div>
      );

    default:
      return (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-neutral-300">
            {field.label}
          </Label>

          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className="
              h-11
              rounded-xl
              border-[#232323]
              bg-[#0A0A0A]
              text-white
              placeholder:text-neutral-600
              focus-visible:border-[#8E2434]
              focus-visible:ring-1
              focus-visible:ring-[#8E2434]
            "
          />
        </div>
      );
  }
}
