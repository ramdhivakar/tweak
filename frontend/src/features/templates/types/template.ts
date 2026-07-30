export interface Template {
  id: string;
  category: string;
  title: string;
  description?: string;
  body: string;
  favorite?: boolean;
}