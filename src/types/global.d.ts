export {};

declare global {
  type FieldType = "text" | "date" | "checkbox" | "number";
  interface FieldInput {
    type: FieldType;
    name?: string;
  }

  interface CategoryObject {
    title: string;
    fields: {
      [id: string]: FieldInput;
    };
  }

  interface CategoryData {
    [id: string]: CategoryObject;
  }
}
