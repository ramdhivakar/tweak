import EditableField from "../EditableField";
import Section from "./Section";

export default function SupportSection({
  editing,
  data,
  update,
}: any) {
  return (
    <Section title="Support">
      <EditableField
        label="Severity"
        value={data.severity}
        editing={editing}
        onChange={(v) => update("severity", v)}
      />

      <EditableField
        label="Logs"
        value={data.logsAvailable ? "Yes" : "No"}
        editing={editing}
        onChange={(v) => update("logsAvailable", v === "Yes")}
      />

      <EditableField
        label="Previous"
        value={data.previousCase ? "Yes" : "No"}
        editing={editing}
        onChange={(v) => update("previousCase", v === "Yes")}
      />
    </Section>
  );
}