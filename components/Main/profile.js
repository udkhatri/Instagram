import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, SafeAreaView, Alert } from "react-native";
import { Button, Avatar, Text, Divider, Appbar } from "react-native-paper";
import { auth, db, fs } from "../../firebase";
import { fetchUser, fetchUserPosts } from "../UserFunctions";
import Constants from "expo-constants";

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

const profile = (props) => {
  useEffect(() => {
    fetchUser();
    fetchUserPosts();
  }, []);

  const createTwoButtonAlert = () => {
    Alert.alert("Log Out", "Are you sure?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          logout();
        },
      },
    ]);
  };

  return (
    <SafeAreaView>
      <Appbar.Header style={{ backgroundColor: "#fff" }}>
        <Appbar.Content title="User Name" />
        <Appbar.Action icon="logout" onPress={createTwoButtonAlert} />
        <Appbar.Action icon="dots-vertical" onPress={console.log("press")} />
      </Appbar.Header>
      <View style={styles.topContainer}>
        <View style={styles.userRaw}>
          <Avatar.Image
            size={90}
            source={require("../../assets/favicon.png")}
          />
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>245</Text>
            <Text>Posts</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>245</Text>
            <Text>Followers</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>245</Text>
            <Text>Following</Text>
          </View>
        </View>
        <View style={styles.editProfile}>
          {/* pass name veriable fetched from backend */}
          <Text>Mr. XYZ</Text>

          <Button
            mode="outlined"
            uppercase={false}
            onPress={console.log("click")}
            contentStyle={{ marginVertical: -3 }}
            style={{
              borderWidth: 1.5,
              borderColor: "black",
              marginVertical: 5,
            }}
          >
            Edit Profile
          </Button>
        </View>
        <Divider style={{ marginTop: 10 }} />
      </View>

      <View>
        <Text>Pictures shows here</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  droidSafeArea: {
    paddingTop: Constants.statusBarHeight,
  },
  topContainer: {
    backgroundColor: "#fff",
  },
  userRaw: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
  },
  editProfile: {
    marginHorizontal: 10,
  },
});
export default profile;
