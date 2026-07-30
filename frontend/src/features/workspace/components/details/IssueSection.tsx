import EditableField from "../EditableField";
import Section from "./Section";

export default function IssueSection({
  editing,
  data,
  update,
}: any) {
  return (
    <Section title="Issue">
      <EditableField
        label="Title"
        value={data.title}
        editing={editing}
        onChange={(v) => update("title", v)}
      />

      <EditableField
        label="Issue"
        value={data.issue}
        editing={editing}
        multiline
        onChange={(v) => update("issue", v)}
      />

      <EditableField
        label="Description"
        value={data.description}
        editing={editing}
        multiline
        onChange={(v) => update("description", v)}
      />
    </Section>
  );
}