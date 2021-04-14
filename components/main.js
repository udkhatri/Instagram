//react redux
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions/index";

//screens
import feedScreen from "./Main/feed";
import profileScreen from "./Main/profile";
import searchScreen from "./Main/search";
import notifiationScreen from "./Main/notification";

//bottom tab navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import BottomTab from "../Navigation/BottomTab";
const Tab = createBottomTabNavigator();
const emptyScreen = () => {
  return null;
};
const main = ({ fetchUser, currentUser }) => {
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          //let size;
          if (route.name === "Home") {
            iconName = focused ? "home" : "ios-home-outline";
            size = focused ? 27 : 25;
          } else if (route.name === "Profile") {
            iconName = focused ? "ios-person" : "ios-person-outline";
            size = focused ? 27 : 25;
          } else if (route.name === "Notification") {
            iconName = focused ? "heart-sharp" : "heart-outline";
            size = focused ? 32 : 30;
          } else if (route.name === "Search") {
            iconName = focused ? "md-search" : "md-search-outline";
            size = focused ? 30 : 28;
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "black",
        inactiveTintColor: "black",
        showLabel: false,
        activeBackgroundColor: "#f1f1f1",
      }}
    >
      <Tab.Screen name="Home" component={feedScreen} />
      <Tab.Screen name="Search" component={searchScreen} />
      {/* to redirect to different screen on pressing add button */}
      <Tab.Screen
        name="AddContainer"
        component={emptyScreen}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("Add");
          },
        })}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="plussquareo" size={27} color="black" />
          ),
        }}
      />
      <Tab.Screen name="Notification" component={notifiationScreen} />
      <Tab.Screen name="Profile" component={profileScreen} />
    </Tab.Navigator>
  );
};
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);
export default connect(null, mapDispatchProps)(main);
