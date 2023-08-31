import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "redux-setup/hooks";
import { Dashboard } from "screens/dashboard";
import { ManageCategories } from "screens/manage-categories";
import { ManageCategory } from "screens/manage-category";

type RootDrawerParamList = {
  Dashboard: undefined;
} & { [key: string]: { categoryId: string; categoryTitle: string } };

export const useTypedNavigation = <T extends keyof RootDrawerParamList>() => {
  return useNavigation<DrawerNavigationProp<RootDrawerParamList, T>>();
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const getScreenName = (title: string) =>
  title.replace(/\s+/g, "_").toLowerCase() || "New Category";

export function MyDrawer() {
  const CATEGORY_LIST = useAppSelector((state) => state.categories.data);

  const drawerScreens = Object.entries(CATEGORY_LIST).map(
    ([categoryId, category]) => {
      console.log(category.title);

      const screenName = getScreenName(category.title);
      return (
        <Drawer.Screen
          key={screenName + categoryId}
          name={screenName}
          component={ManageCategory}
          initialParams={{ categoryId, categoryTitle: category.title }}
        />
      );
    }
  );

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      {drawerScreens}
      <Drawer.Screen name="Manage Categories" component={ManageCategories} />
    </Drawer.Navigator>
  );
}
