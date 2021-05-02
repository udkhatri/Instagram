import React from "react";
import { View, Text } from "react-native";
import { Appbar } from "react-native-paper";

const notification = () => {
  return (
    <View>
      <Appbar.Header style={{ backgroundColor: "#fff" }}>
        <Appbar.Content title="Activity" />
      </Appbar.Header>
      <Text>notification</Text>
    </View>
  );
};

export default notification;
