import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateUUID } from "utils/helpers";

interface Field {
  type: FieldType;
  name?: string;
  value?: string | number | boolean | null;
}

interface Category {
  title: string;
  fields: { [key: string]: Field };
}

interface CategoryState {
  data: { [key: string]: Category };
  dynamicFields: { [key: string]: any };
}

const initialData: CategoryState["data"] = {
  "1": {
    title: "ridwan",
    fields: { "1": { type: "text", name: "she" }, "2": { type: "date" } },
  },
};

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    data: initialData,
    dynamicFields: {},
  } as CategoryState,
  reducers: {
    deleteCategory: (state, action: PayloadAction<string>) => {
      const categoryId = action.payload;
      delete state.data[categoryId];
    },
    addField: (
      state,
      action: PayloadAction<{ categoryId: string; fieldValue: FieldType }>
    ) => {
      const { categoryId, fieldValue } = action.payload;
      const newFieldId = generateUUID();

      if (!state.data[categoryId].fields) {
        state.data[categoryId].fields = {};
      }

      state.data[categoryId].fields[newFieldId] = { type: fieldValue };
    },
    addCategory: (state) => {
      const newCategoryId = generateUUID();
      state.data[newCategoryId] = {
        title: "New Category",
        fields: {},
      };
    },
    editTitle: (
      state,
      action: PayloadAction<{ categoryId: string; newTitle: string }>
    ) => {
      const { categoryId, newTitle } = action.payload;
      state.data[categoryId].title = newTitle;
    },
    deleteField: (
      state,
      action: PayloadAction<{ categoryId: string; fieldId: string }>
    ) => {
      const { categoryId, fieldId } = action.payload;
      if (state.data[categoryId] && state.data[categoryId].fields) {
        delete state.data[categoryId].fields[fieldId];
      }
    },
    updateField: (
      state,
      action: PayloadAction<{
        categoryId: string;
        fieldId: string;
        value: string;
      }>
    ) => {
      const { categoryId, fieldId, value } = action.payload;
      state.data[categoryId].fields[fieldId].name = value;
    },
    // Other reducers
  },
});

export const {
  deleteCategory,
  addField,
  addCategory,
  deleteField,
  updateField,
  editTitle,
} = categorySlice.actions;

export default categorySlice.reducer;
