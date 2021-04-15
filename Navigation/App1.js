import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";

//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import Landing from "../components/Auth/Landing";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import MainScreen from "../components/main";
import addScreen from "../components/Main/add";

//components and redux
import { auth, db } from "../firebase";
import { Text, View } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../redux/reducer";
import thunk from "redux-thunk";
import { ActivityIndicator, Colors } from "react-native-paper";

const store = createStore(rootReducer, applyMiddleware(thunk));
const Stack = createStackNavigator();

export default function App1() {
  const [loaded, setLoaded] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        setLogin(false);
        // console.log(user);
        setLoaded(true);
      } else {
        setLogin(true);
        setLoaded(true);
        // console.log(user);
      }
    });
  }, []);

  if (!loaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator
          animating={true}
          color={Colors.blue400}
          size="large"
        />
      </View>
    );
  } else if (!login) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="main"
            component={MainScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Add" component={addScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
