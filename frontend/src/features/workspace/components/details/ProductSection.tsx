import EditableField from "../EditableField";
import Section from "./Section";

export default function ProductSection({
  editing,
  data,
  update,
}: any) {
  return (
    <Section title="Product">
      <EditableField
        label="Product"
        value={data.product}
        editing={editing}
        onChange={(v) => update("product", v)}
      />

      <EditableField
        label="Version"
        value={data.productVersion}
        editing={editing}
        onChange={(v) => update("productVersion", v)}
      />

      <EditableField
        label="Site ID"
        value={data.siteId}
        editing={editing}
        onChange={(v) => update("siteId", v)}
      />
    </Section>
  );
}