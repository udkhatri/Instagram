import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";

//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import Landing from "../components/Auth/Landing";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import ForgotPW from "../components/Auth/ForgotPW";
import MainScreen from "../components/main";
import addScreen from "../components/Main/add";
import SaveScreen from "../components/Main/Save";
//components and redux
import { auth, db } from "../firebase";
import { Text, View } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";

const Stack = createStackNavigator();

export default function App1({ navigation }) {
  const [loaded, setLoaded] = useState(false);
  const [login, setLogin] = useState(false);
  // const [emailVerified, setEmailVerified] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        setLogin(false);
        console.log(user + " !user");
        setLoaded(true);
        // setEmailVerified(false);
        // console.log(emailVerified + " is verification status");
      } else {
        setLogin(true);
        setLoaded(true);
        // setEmailVerified(true);
        // console.log(emailVerified + " is verification status");
      }
    });
  }, []);

  if (!loaded) {
    console.log(loaded);
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
          <Stack.Screen
            name="ForgotPW"
            component={ForgotPW}
            options={{ headerShown: true, title: "Forgot password" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="main"
          component={MainScreen}
          options={{
            headerShown: false,
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="Add"
          component={addScreen}
          navigation={navigation}
        />
        <Stack.Screen
          options={{ title: "New Post" }}
          name="Save"
          component={SaveScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
