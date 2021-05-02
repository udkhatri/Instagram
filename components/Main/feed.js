import React from "react";
import { View, Text, Image } from "react-native";
import { Appbar } from "react-native-paper";

const feed = () => {
  return (
    <View>
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
      <Text>feed screen</Text>
    </View>
  );
};

export default feed;
