import { FlatList, StyleSheet, View, useWindowDimensions } from "react-native";
import { Button } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "redux-setup/hooks";
import {
  addCategory,
  addField,
  deleteCategory,
  deleteField,
  updateField,
} from "redux-setup/slices/category";
import { CategoryCard } from "shared/category-card";

export const ManageCategories = () => {
  const { width } = useWindowDimensions();
  const isTab = width > 500 ? 2 : 1;
  const categories = useAppSelector((state) => state.categories.data);
  const dispatch = useAppDispatch();

  const handleAddData = () => {
    dispatch(addCategory());
  };

  const handleDeleteField = (categoryId: string, fieldId: string) => {
    dispatch(deleteField({ categoryId, fieldId }));
  };

  const handleInputChange = (id: string, fieldId: string, value: string) => {
    dispatch(updateField({ categoryId: id, fieldId, value }));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.entries(categories)}
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => (
          <CategoryCard
            data={item[1]}
            id={item[0]}
            onDelete={() => dispatch(deleteCategory(item[0]))}
            onAddField={(fieldValue: FieldType) =>
              dispatch(addField({ categoryId: item[0], fieldValue }))
            }
            onInputChange={(fieldId: string, value: string) =>
              handleInputChange(item[0], fieldId, value)
            }
            onDeleteField={(fieldId: string) =>
              handleDeleteField(item[0], fieldId)
            }
          />
        )}
        numColumns={isTab}
      />

      <Button mode="contained" onPress={handleAddData} style={styles.button}>
        ADD NEW CATEGORY
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
