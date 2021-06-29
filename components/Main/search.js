import React, { useState, useEffect } from "react";
import { View, Text, Image, ActivityIndicator, FlatList } from "react-native";
import {
  Appbar,
  TextInput,
  Headline,
  Button,
  Card,
  Avatar,
  Title,
  IconButton,
  Paragraph,
  Caption,
} from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { SearchBar } from "react-native-elements";
import { db, fs, auth } from "../../firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const search = (props) => {
  const [user, setUser] = useState([]);
  const [userName, setUserName] = useState("");
  const fetchUserPosts = async (search) => {
    await db
      .collection("users")
      .where("Name", "==", search)
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.reverse().map((doc) => {
          const data = doc.data();
          //console.log(data.downloadURL);
          const id = doc.id;
          return { id, ...data };
        });
        setUser(posts);
      });
  };

  return (
    <View>
      <Appbar.Header style={{ backgroundColor: "#fff" }}>
        <View
          style={{
            flex: 1,
          }}
        >
          <SearchBar
            round={true}
            containerStyle={{
              padding: 0,
              marginHorizontal: 10,
              backgroundColor: "#f000",
              borderBottomColor: "#f000",
              borderTopColor: "#f000",
            }}
            inputContainerStyle={{
              backgroundColor: "#efefef",
              height: 40,
              padding: 5,
            }}
            //loadingProps={<ActivityIndicator />}
            inputStyle={{ color: "black" }}
            placeholder="Type Here..."
            onChangeText={(text) => {
              fetchUserPosts(text);
              setUserName(text);
            }}
            value={userName}
          />
        </View>
      </Appbar.Header>
      <FlatList
        style={{ paddingTop: 2 }}
        numColumns={1}
        horizontal={false}
        data={user}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{ backgroundColor: "#fff" }}
            onPress={() => {
              if (item.id === auth.currentUser.uid) {
                props.navigation.navigate("Profile");
              } else {
                props.navigation.navigate("userProfile", {
                  uid: item.id,
                  uname: item.Name,
                });
              }
            }}
          >
            <Card.Title
              style={{ marginVertical: -5, backgroundcolor: "white" }}
              titleStyle={{
                fontSize: 15,
                marginBottom: 0,
                marginTop: -5,
              }}
              subtitle={<Caption>{item.Email}</Caption>}
              subtitleStyle={{ marginTop: -10 }}
              title={item.Name} //pass username from inharited page
              left={(props) => (
                <Avatar.Image
                  size={50}
                  source={require("../../assets/favicon.png")}
                />
              )}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default search;
