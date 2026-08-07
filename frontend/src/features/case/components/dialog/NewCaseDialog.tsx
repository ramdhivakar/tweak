import { useState } from "react";
import { v4 as uuid } from "uuid";
import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { newCaseFields } from "../../data/newCaseFields";
import { useCaseContext } from "../../context/CaseContext";
import type { Case } from "../../types/case";

import DynamicField from "./DynamicField";

interface Props {
  trigger?: ReactNode;
}

export default function NewCaseDialog({ trigger }: Props) {
  const { dispatch } = useCaseContext();

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState<Record<string, string>>({});

  function updateField(id: string, value: string) {
    setFormData((prev) => {
      const updated = {
        ...prev,
        [id]: value,
      };

      if (id === "hasPreviousCase" && value === "false") {
        updated.previousCase = "";
        updated.previousTroubleshooting = "";
      }

      if (id === "logsAvailable" && value === "false") {
        updated.availableLogs = "";
      }

      return updated;
    });
  }

  function createCase() {
    const now = new Date().toISOString();

    const newCase: Case = {
      id: uuid(),

      // Basic
      caseId: formData.caseId || "",
      title: formData.issue || "Untitled Case",

      // Customer
      customerName: formData.customerName || "",
      companyName: formData.companyName || "",

      emails: formData.emails
        ? formData.emails
            .split(",")
            .map((email) => email.trim())
            .filter(Boolean)
            .map((email) => ({
              id: uuid(),
              value: email,
            }))
        : [],

      phoneNumbers: formData.phoneNumbers
        ? formData.phoneNumbers
            .split(",")
            .map((phone) => phone.trim())
            .filter(Boolean)
            .map((phone) => ({
              id: uuid(),
              value: phone,
            }))
        : [],

      // Product
      product: formData.product || "",
      productVersion: formData.productVersion || "",
      siteId: formData.siteId || "",

      // Support
      caseType: (formData.caseType as "Issue" | "Query") || "Issue",

      severity:
        (formData.severity as "Low" | "Medium" | "High" | "Critical") ||
        "Medium",

      status: "New",

      timeZone: formData.timeZone || "",

      logsAvailable: formData.logsAvailable === "true",

      availableLogs: formData.availableLogs || "",

      previousCase: formData.previousCase || "",

      previousTroubleshooting: formData.previousTroubleshooting || "",

      // First Interaction
      connectedTime: "",

      contactMode: "",

      totalClients: "",

      affectedClients: "",

      clientOS: "",

      serverOS: "",

      database: "",

      troubleshootingSteps: "",

      resolutionSummary: "",

      logReview: "",

      // Case
      issue: formData.issue || "",

      description: formData.description || "",

      // Misc
      notes: "",

      timeline: [],

      createdAt: now,

      updatedAt: now,
    };

    dispatch({
      type: "ADD_CASE",
      payload: newCase,
    });

    setFormData({});
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className="w-full justify-start rounded-xl bg-[#8E2434] text-white hover:bg-[#A92C3F]">
            + New Case
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="flex h-[90vh] w-[96vw] max-w-7xl flex-col overflow-hidden rounded-3xl border border-[#1A1A1A] bg-[#050505] p-0 shadow-2xl">
        {/* Header */}

        <DialogHeader className="border-b border-[#1A1A1A] bg-[#070707] px-10 py-7">
          <div>
            <DialogTitle className="text-3xl font-semibold tracking-tight text-white">
              New Case
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Body */}

        <div className="flex-1 overflow-y-auto px-4 py-10">
          <div className="space-y-12">
            {newCaseFields.map((section) => (
              <section key={section.id}>
                <div className="mb-8">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
                    {section.title}
                  </h2>

                  <div className="mt-3 h-px bg-[#1A1A1A]" />
                </div>

                <div
                  className={
                    section.columns === 2
                      ? "grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2"
                      : "space-y-6"
                  }
                >
                  {section.fields
                    .filter((field) => {
                      if (
                        field.id === "previousCase" ||
                        field.id === "previousTroubleshooting"
                      ) {
                        return formData.hasPreviousCase === "true";
                      }

                      if (field.id === "availableLogs") {
                        return formData.logsAvailable === "true";
                      }

                      return true;
                    })
                    .map((field) => (
                      <DynamicField
                        key={field.id}
                        field={field}
                        value={formData[field.id] || ""}
                        onChange={(value) => updateField(field.id, value)}
                      />
                    ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* Footer */}

        <div className="flex items-center justify-end gap-4 border-t border-[#1A1A1A] bg-[#070707] px-10 py-6">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="rounded-xl border-[#303030] bg-transparent px-6 text-neutral-300 hover:bg-[#111111] hover:text-white"
          >
            Cancel
          </Button>

          <Button
            onClick={createCase}
            className="rounded-xl bg-[#8E2434] px-6 text-white hover:bg-[#A92C3F]"
          >
            Create Case
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
