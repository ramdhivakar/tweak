import EditableField from "../EditableField";
import Section from "./Section";

export default function TroubleshootingSection({ editing, data, update }: any) {
  return (
    <Section title="Troubleshooting">
      <EditableField
        label="Troubleshooting Steps"
        value={data.troubleshootingSteps}
        editing={editing}
        multiline
        onChange={(v) => update("troubleshootingSteps", v)}
      />

      <EditableField
        label="Resolution Summary"
        value={data.resolutionSummary}
        editing={editing}
        multiline
        onChange={(v) => update("resolutionSummary", v)}
      />

      <EditableField
        label="Log Review"
        value={data.logReview}
        editing={editing}
        multiline
        onChange={(v) => update("logReview", v)}
      />
    </Section>
  );
}
