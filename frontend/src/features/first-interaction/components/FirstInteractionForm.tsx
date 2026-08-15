import { useFirstInteraction } from "../context/FirstInteractionContext";

export default function FirstInteractionForm() {
  const { data, updateField } = useFirstInteraction();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-medium text-neutral-400">
            Connected Time
          </label>

          <input
            type="datetime-local"
            value={data.connectedTime}
            onChange={(e) =>
              updateField("connectedTime", e.target.value)
            }
            className="h-11 w-full rounded-xl border border-[#232323] bg-[#0A0A0A] px-3 text-sm text-white outline-none transition focus:border-[#8E2434] focus:ring-1 focus:ring-[#8E2434]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-neutral-400">
            Contact Mode
          </label>

          <select
            value={data.contactMode}
            onChange={(e) =>
              updateField(
                "contactMode",
                e.target.value as typeof data.contactMode,
              )
            }
            className="h-11 w-full rounded-xl border border-[#232323] bg-[#0A0A0A] px-3 text-sm text-white outline-none transition focus:border-[#8E2434] focus:ring-1 focus:ring-[#8E2434]"
          >
            <option value="Microsoft Teams">Microsoft Teams</option>
            <option value="Phone">Phone</option>
            <option value="Email">Email</option>
            <option value="Webex">Webex</option>
            <option value="Zoom">Zoom</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-neutral-400">
          Troubleshooting Steps Performed
        </label>

        <textarea
          value={data.troubleshootingSteps}
          onChange={(e) =>
            updateField("troubleshootingSteps", e.target.value)
          }
          placeholder="Enter troubleshooting steps..."
          className="min-h-40 w-full resize-y rounded-xl border border-[#232323] bg-[#0A0A0A] px-3 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-[#8E2434] focus:ring-1 focus:ring-[#8E2434]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-neutral-400">
          Summary of Resolution
        </label>

        <textarea
          value={data.resolutionSummary}
          onChange={(e) =>
            updateField("resolutionSummary", e.target.value)
          }
          placeholder="Enter resolution summary..."
          className="min-h-32 w-full resize-y rounded-xl border border-[#232323] bg-[#0A0A0A] px-3 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-[#8E2434] focus:ring-1 focus:ring-[#8E2434]"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-medium text-neutral-400">
            Status of the Case
          </label>

          <select
            value={data.status}
            onChange={(e) =>
              updateField(
                "status",
                e.target.value as typeof data.status,
              )
            }
            className="h-11 w-full rounded-xl border border-[#232323] bg-[#0A0A0A] px-3 text-sm text-white outline-none transition focus:border-[#8E2434] focus:ring-1 focus:ring-[#8E2434]"
          >
            <option value="Pending Customer">Pending Customer</option>
            <option value="Pending Support">Pending Support</option>
            <option value="Pending Engineering">
              Pending Engineering
            </option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-neutral-400">
            Logs Collected
          </label>

          <button
            type="button"
            onClick={() =>
              updateField("logsCollected", !data.logsCollected)
            }
            className="flex h-11 w-full items-center justify-between rounded-xl border border-[#232323] bg-[#0A0A0A] px-4 transition hover:border-[#8E2434]"
          >
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
              {data.logsCollected ? "Yes" : "No"}
            </span>

            <span
              className={`h-5 w-9 rounded-full p-0.5 transition ${
                data.logsCollected ? "bg-[#8E2434]" : "bg-[#292929]"
              }`}
            >
              <span
                className={`block h-4 w-4 rounded-full bg-white transition-transform ${
                  data.logsCollected ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {data.logsCollected && (
        <div className="space-y-2">
          <label className="text-xs font-medium text-neutral-400">
            Log Review / Findings
          </label>

          <textarea
            value={data.logFindings}
            onChange={(e) =>
              updateField("logFindings", e.target.value)
            }
            placeholder="Enter log review or findings..."
            className="min-h-32 w-full resize-y rounded-xl border border-[#232323] bg-[#0A0A0A] px-3 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-[#8E2434] focus:ring-1 focus:ring-[#8E2434]"
          />
        </div>
      )}
    </div>
  );
}