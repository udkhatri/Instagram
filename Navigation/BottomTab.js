// import React, { useEffect, useState } from "react";

// //screens
// import feedScreen from "../components/main/feed";
// import profileScreen from "../components/main/profile";
// import searchScreen from "../components/main/search";
// import notifiationScreen from "../components/main/notification";
// import addScreen from "../components/main/add";

// //bottom tab navigation
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Ionicons } from "@expo/vector-icons";

// const Tab = createBottomTabNavigator();
// const BottomTab = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;
//           //let size;
//           if (route.name === "Home") {
//             iconName = focused ? "home" : "ios-home-outline";
//             size = focused ? 27 : 25;
//           } else if (route.name === "Add") {
//             iconName = focused ? "md-add-circle" : "md-add-circle-outline";
//             size = 33;
//             //color = "black";
//           } else if (route.name === "Profile") {
//             iconName = focused ? "ios-person" : "ios-person-outline";
//             size = focused ? 27 : 25;
//           } else if (route.name === "Notification") {
//             iconName = focused ? "heart-sharp" : "heart-outline";
//             size = focused ? 30 : 28;
//           } else if (route.name === "Search") {
//             iconName = focused ? "md-search" : "md-search-outline";
//             size = focused ? 30 : 28;
//           }
//           // You can return any component that you like here!
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//       })}
//       tabBarOptions={{
//         activeTintColor: "black",
//         inactiveTintColor: "black",
//         showLabel: false,
//         activeBackgroundColor: "#f1f1f1",
//       }}
//     >
//       <Tab.Screen name="Home" component={feedScreen} />
//       <Tab.Screen name="Search" component={searchScreen} />
//       <Tab.Screen name="Add" component={addScreen} />
//       <Tab.Screen name="Notification" component={notifiationScreen} />
//       <Tab.Screen name="Profile" component={profileScreen} />
//     </Tab.Navigator>
//   );
// };
// export default BottomTab;
