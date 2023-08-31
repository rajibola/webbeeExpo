import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { MyDrawer } from "navigation-setup";
import { Provider } from "react-redux";
import { store } from "redux-setup/store";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <MyDrawer />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
