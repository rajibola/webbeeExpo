import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Menu, Button, IconButton } from "react-native-paper";
import { useAppDispatch } from "redux-setup/hooks";
import { editTitle } from "redux-setup/slices/category";

interface CategoryCardProps {
  data: CategoryObject;
  id: string;
  onDelete: () => void;
  onAddField: (text: FieldType) => void;
  onInputChange: (key: string, value: any) => void;
  onDeleteField: (id: string) => void;
}

export const CategoryCard = ({
  data,
  id,
  onDelete,
  onAddField,
  onInputChange,
  onDeleteField,
}: CategoryCardProps) => {
  // const [title, setTitle] = useState("New Category");
  const [visible, setVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      <View style={styles.listWrapper}>
        <TextInput
          onChangeText={(text) =>
            dispatch(editTitle({ categoryId: id, newTitle: text }))
          }
          mode="outlined"
          label="Category Name"
          value={data.title}
        />

        {Object.entries(data.fields).map(([key, field]) => (
          <View style={styles.fieldWrapper}>
            <View style={styles.innerFieldWrapper} key={key}>
              <TextInput
                value={field.name || ""}
                onChangeText={(text) => onInputChange(key, text)}
                mode="outlined"
                label="Field"
                style={styles.input}
              />
              <Text style={styles.typeText}>{field.type}</Text>
            </View>
            <IconButton
              style={{ padding: 0 }}
              icon="delete"
              size={20}
              onPress={() => onDeleteField(key)}
            />
          </View>
        ))}
      </View>

      <View style={styles.flex}>
        <Button uppercase mode="outlined" onPress={onDelete}>
          Delete
        </Button>

        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button mode="outlined" onPress={openMenu}>
              ADD NEW FIELD
            </Button>
          }
        >
          <Menu.Item
            titleStyle={styles.menu}
            onPress={() => onAddField("checkbox")}
            title="checkbox"
          />
          <Menu.Item
            titleStyle={styles.menu}
            onPress={() => onAddField("date")}
            title="date"
          />
          <Menu.Item
            titleStyle={styles.menu}
            onPress={() => onAddField("number")}
            title="number"
          />
          <Menu.Item
            titleStyle={styles.menu}
            onPress={() => onAddField("text")}
            title="text"
          />
        </Menu>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0,
    flex: 1,
  },
  typeText: {
    textTransform: "uppercase",
    borderRightWidth: 1,
  },
  input: {
    flex: 1,
  },
  innerFieldWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },
  menu: {
    textTransform: "uppercase",
  },
  listWrapper: {
    gap: 5,
  },
  flex: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 8,
  },
  container: {
    width: "100%",
    minHeight: 80,
    flex: 1,
    margin: 8,
    padding: 15,
    backgroundColor: "white",
  },
});
