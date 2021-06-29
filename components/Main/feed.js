import React from "react";
import { View, Text, Image, useWindowDimensions } from "react-native";
import { Appbar } from "react-native-paper";
import PostCard from "../reusable/PostCard";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "./homeScreen";
import { BackgroundImage } from "react-native-elements/dist/config";
const Tab = createMaterialTopTabNavigator();

const ChatScreen = () => {
  return <Text>Chat sreen</Text>;
};
const StoryScreen = () => {
  return <Text>Story sreen</Text>;
};
const feed = () => {
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      {/* header complete */}
      <Tab.Navigator tabBar={() => {}} initialRouteName="HomeScreen">
        <Tab.Screen name="StoryScreen" component={StoryScreen} />
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="ChatScreen" component={ChatScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default feed;
