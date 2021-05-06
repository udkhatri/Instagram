import React from "react";
import { View, Text, Image, useWindowDimensions } from "react-native";
import { Appbar } from "react-native-paper";
import PostCard from "../reusable/PostCard";
const users = [
  {
    name: "brynn",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
  },
];
const feed = () => {
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <Appbar.Header
        style={{ backgroundColor: "#fff", justifyContent: "space-between" }}
      >
        <Appbar.Action icon="instagram" onPress={console.log("press")} />

        <Image
          source={require("../../assets/insta.png")}
          style={{ height: 39, width: 120 }}
        />

        <Appbar.Action
          icon="facebook-messenger"
          onPress={console.log("press")}
        />
      </Appbar.Header>

      {/* header complete */}

      <PostCard userName="Uday Khatri" likes="250" caption="hakunamatata" />
      <Text>feed screen</Text>
    </View>
  );
};

export default feed;
