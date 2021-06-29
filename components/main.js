//react redux
import { TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchUser, fetchUserPosts } from "./UserFunctions";
import { BlurView } from "expo-blur";
//screens
import feedScreen from "./Main/feed";
import profileScreen from "./Main/profile";
import searchScreen from "./Main/search";
import notifiationScreen from "./Main/notification";

//bottom tab navigation
import {
  createBottomTabNavigator,
  createStackNavigator,
} from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const customTabBarButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        top: -25,
        justifyContent: "center",
        alignContent: "center",
        elevation: 5,
      }}
    >
      <View style={{ width: 70, height: 70, borderRadius: 35 }}>
        {children}
      </View>
    </TouchableOpacity>
  );
};
const Tab = createBottomTabNavigator();
const emptyScreen = () => {
  return null;
};

const main = () => {
  return (
    <Tab.Navigator
      shifting={true}
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size, el, activeColor }) => {
          let iconName;
          //let size;
          if (route.name === "Home") {
            iconName = focused ? "home" : "ios-home-outline";
            size = 28;
            el = focused ? 10 : 0;
            activeColor = focused ? "#a2d2ff" : "#fff";
            color = focused ? "#fff" : "#a2d2ff";
          } else if (route.name === "Profile") {
            iconName = focused ? "ios-person" : "ios-person-outline";
            size = 28;
            el = focused ? 5 : 0;
            activeColor = focused ? "#84a59d" : "#fff";
            color = focused ? "#fff" : "#84a59d";
          } else if (route.name === "Notification") {
            iconName = focused ? "heart-sharp" : "heart-outline";
            size = 28;
            el = focused ? 5 : 0;
            activeColor = focused ? "#ffb5a7" : "#fff";
            color = focused ? "#fff" : "#ffb5a7";
          } else if (route.name === "Search") {
            iconName = focused ? "md-search" : "md-search-outline";
            size = 28;
            el = focused ? 5 : 0;
            activeColor = focused ? "#9a8c98" : "#fff";
            color = focused ? "#fff" : "#9a8c98";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
              style={{
                backgroundColor: activeColor,
                borderRadius: 7,
                padding: 6,
                elevation: el,
                shadowOffset: {
                  height: 0,
                  width: 0,
                },
              }}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "black",
        inactiveTintColor: "black",
        showLabel: false,

        keyboardHidesTabBar: true,
        style: {
          position: "absolute",
          bottom: 10,
          left: 20,
          right: 20,
          elevation: 7,
          backgroundColor: "#fff",
          height: 70,
          borderRadius: 15,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{ title: "instagram" }}
        component={feedScreen}
      />
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

          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/plus3Dg.png")}
              resizeMode="contain"
              style={{ height: 120, width: 120 }}
            />

            //<Ionicons name="md-add-circle-outline" size={30} color="black" />
          ),
          // tabBarButton: (props) => {
          //   <customTabBarButton {...props} />;
          // },
        }}
      />
      <Tab.Screen name="Notification" component={notifiationScreen} />
      <Tab.Screen name="Profile" component={profileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});
export default main;
