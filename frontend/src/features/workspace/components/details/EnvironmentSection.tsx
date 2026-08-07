import EditableField from "../EditableField";
import Section from "./Section";

export default function EnvironmentSection({ editing, data, update }: any) {
  return (
    <Section title="Environment">
      <EditableField
        label="Connected Time"
        value={data.connectedTime}
        editing={editing}
        onChange={(v) => update("connectedTime", v)}
      />

      <EditableField
        label="Contact Mode"
        value={data.contactMode}
        editing={editing}
        onChange={(v) => update("contactMode", v)}
      />

      <EditableField
        label="Total Clients"
        value={data.totalClients}
        editing={editing}
        onChange={(v) => update("totalClients", v)}
      />

      <EditableField
        label="Affected Clients"
        value={data.affectedClients}
        editing={editing}
        onChange={(v) => update("affectedClients", v)}
      />

      <EditableField
        label="Client OS"
        value={data.clientOS}
        editing={editing}
        onChange={(v) => update("clientOS", v)}
      />

      <EditableField
        label="Server OS"
        value={data.serverOS}
        editing={editing}
        onChange={(v) => update("serverOS", v)}
      />

      <EditableField
        label="Database"
        value={data.database}
        editing={editing}
        onChange={(v) => update("database", v)}
      />
    </Section>
  );
}
