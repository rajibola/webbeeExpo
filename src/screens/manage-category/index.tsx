import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  useWindowDimensions,
  Text,
  TextInput,
} from "react-native";
import { Button, Switch } from "react-native-paper";
import { generateUUID } from "utils/helpers";

const COMPONENT_LIST: { [key in FieldType]: (props: any) => JSX.Element } = {
  checkbox: Switch,
  date: () => <Text>date</Text>,
  text: () => <TextInput />,
  number: () => <Text>number</Text>,
};

interface CategoryField {
  type: FieldType;
  name?: string;
  value?: string | number | boolean | null;
}

interface CategoryObject {
  title: string;
  fields: { [key: string]: CategoryField };
}

type CategoryData = { [key: string]: CategoryObject };

const initialData: CategoryObject = {
  title: "ridwan",
  fields: {
    hgsc: { type: "text", name: "message", value: null },
    sdhsdh: { type: "checkbox", name: "isTrue", value: false },
  },
};

export const ManageCategory = () => {
  const { width } = useWindowDimensions();
  const isTab = width > 500 ? 2 : 1;
  const [lists, setLists] = useState<CategoryData>({});

  const handleAddtoList = () => {
    const newListId = generateUUID();
    const item = {
      ...initialData.fields,
    };
    setLists({
      ...lists,
      [newListId]: { title: initialData.title, fields: item },
    });
  };

  const handleFieldValueChange = (
    listId: string,
    fieldId: string,
    newValue: any
  ) => {
    setLists((prevLists) => ({
      ...prevLists,
      [listId]: {
        ...prevLists[listId],
        fields: {
          ...prevLists[listId].fields,
          [fieldId]: {
            ...prevLists[listId].fields[fieldId],
            value: newValue,
          },
        },
      },
    }));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.entries(lists || {})}
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => (
          <CategoryItem
            listId={item[0]}
            fields={item[1].fields}
            onFieldValueChange={handleFieldValueChange}
          />
        )}
        numColumns={isTab}
      />

      <Button mode="contained" onPress={handleAddtoList} style={styles.button}>
        ADD NEW ITEM
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
    backgroundColor: "blue",
    borderRadius: 4,
  },
  container: {
    flex: 1,
  },
});

const CategoryItem = ({
  listId,
  fields,
  onFieldValueChange,
}: {
  listId: string;
  fields: { [key: string]: CategoryField };
  onFieldValueChange: (listId: string, fieldId: string, newValue: any) => void;
}) => {
  return (
    <View style={{ flex: 1, borderWidth: 1, minHeight: 40 }}>
      {Object.entries(fields).map(([fieldId, field]) => {
        const FieldComponent = COMPONENT_LIST[field.type];
        return (
          <FieldComponent
            key={fieldId}
            value={field.value}
            onValueChange={(newValue: any) =>
              onFieldValueChange(listId, fieldId, newValue)
            }
          />
        );
      })}
    </View>
  );
};

export default ManageCategory;
