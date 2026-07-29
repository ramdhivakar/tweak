import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { caseSections } from "../data/caseFields";

export default function CaseForm() {
  return (
    <div className="space-y-10">
      {caseSections.map((section) => (
        <section key={section.title}>
          {/* Section Header */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-100">
              {section.title}
            </h2>

            <div className="mt-2 h-px bg-slate-800" />
          </div>

          {/* Fields */}
          <div
            className={
              section.columns === 2
                ? "grid grid-cols-1 gap-6 md:grid-cols-2"
                : "space-y-6"
            }
          >
            {section.fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label
                  htmlFor={field.id}
                  className="text-sm font-medium text-slate-300"
                >
                  {field.label}

                  {field.required && (
                    <span className="ml-1 text-red-500">*</span>
                  )}
                </Label>

                {field.type === "textarea" ? (
                  <Textarea
                    id={field.id}
                    placeholder={field.placeholder}
                    className="min-h-44 resize-none border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus-visible:ring-blue-500"
                  />
                ) : (
                  <Input
                    id={field.id}
                    placeholder={field.placeholder}
                    className="border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus-visible:ring-blue-500"
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
