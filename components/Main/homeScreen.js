import React from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { Appbar, Button, Avatar } from "react-native-paper";
import PostCard from "../reusable/PostCard";

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/backface.jpg")}
      style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}
    >
      <View style={{ flex: 1 }}>
        <Appbar.Header
          style={{
            backgroundColor: "#fff0",
            justifyContent: "space-between",
            borderRadius: 15,
            elevation: 0,
          }}
        >
          <Appbar.Action
            icon="camera-outline"
            onPress={() => console.log("press")}
          />
          <Image
            source={require("../../assets/insta.png")}
            style={{ height: 39, width: 120 }}
          />
          <Appbar.Action
            icon="message-text-outline"
            onPress={() => navigation.navigate("ChatScreen")}
          />
        </Appbar.Header>
        {/* header complete */}
        <PostCard userName="Uday Khatri" likes="250" caption="hakunamatata" />
        <Text>feed screen</Text>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
