import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { auth } from "../../firebase";
const logout = () => {
  auth
    .signOut()
    .then(() => {
      console.log("success");
    })
    .catch((err) => {
      console.log(err);
    });
};
const profile = () => {
  return (
    <View>
      <Text>profile</Text>
      <Button onPress={logout}>Logout</Button>
    </View>
  );
};

export default profile;
