import EditableField from "../EditableField";
import Section from "./Section";

interface Props {
  editing: boolean;
  data: any;
  update: (field: string, value: any) => void;
}

export default function CustomerSection({
  editing,
  data,
  update,
}: Props) {
  return (
    <Section title="Customer">
      <EditableField
        label="Customer"
        value={data.customerName}
        editing={editing}
        onChange={(v) => update("customerName", v)}
      />

      <EditableField
        label="Company"
        value={data.companyName}
        editing={editing}
        onChange={(v) => update("companyName", v)}
      />

      <EditableField
        label="Emails"
        value={data.emails?.join(", ")}
        editing={editing}
        onChange={(v) =>
          update(
            "emails",
            v
              .split(",")
              .map((x: string) => x.trim())
              .filter(Boolean)
          )
        }
      />

      <EditableField
        label="Phones"
        value={data.phoneNumbers?.join(", ")}
        editing={editing}
        onChange={(v) =>
          update(
            "phoneNumbers",
            v
              .split(",")
              .map((x: string) => x.trim())
              .filter(Boolean)
          )
        }
      />
    </Section>
  );
}