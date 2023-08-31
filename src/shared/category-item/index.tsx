import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Menu, Button, IconButton } from "react-native-paper";

interface CategoryItemProps {
  data: CategoryObject;
  onDelete: () => void;
  onAddField: (text: FieldType) => void;
  onInputChange: (key: string, value: any) => void;
  onDeleteField: (id: string) => void;
}

export const CategoryItem = ({
  data,
  onDelete,
  onAddField,
  onInputChange,
  onDeleteField,
}: CategoryItemProps) => {
  const [title, setTitle] = useState("New Category");
  const [visible, setVisible] = useState<boolean>(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.listWrapper}>
        <TextInput
          onChangeText={(text) => setTitle(text)}
          mode="outlined"
          label="Category Name"
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
