export type TemplateCategory =
  | "Communication"
  | "Follow Up"
  | "Calls"
  | "Collaboration";

export interface Template {
  id: string;

  title: string;

  category: TemplateCategory;

  description?: string;

  favorite?: boolean;

  body: string;
}
