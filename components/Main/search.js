import React, { useState } from "react";
import { View, Text, Image, TextInput } from "react-native";
import { Appbar } from "react-native-paper";
import { Feather } from "@expo/vector-icons";

const search = () => {
  const [caption, setCaption] = useState("");
  return (
    <View>
      <Appbar.Header style={{ backgroundColor: "#fff" }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#afafaf",
            borderRadius: 9,
            margin: 10,
            padding: 6,
          }}
        >
          <Feather name="search" size={24} color="black" />
          <TextInput
            placeholder="Search"
            value={caption}
            autoFocus={false}
            onChangeText={(text) => setCaption(text)}
            style={{
              flex: 1,
            }}
          />
        </View>
      </Appbar.Header>
      <Text>Search</Text>
    </View>
  );
};

export default search;
