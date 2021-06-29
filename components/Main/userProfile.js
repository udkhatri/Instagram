import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from "react-native";

import {
  Button,
  Avatar,
  Divider,
  Appbar,
  ActivityIndicator,
  IconButton,
  Caption,
} from "react-native-paper";
import { Text } from "react-native-elements";

import { auth, db, fs } from "../../firebase";
import Constants from "expo-constants";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Icon } from "react-native-elements";

const Tab = createMaterialTopTabNavigator();
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

const userProfile = ({ navigation, route }, props) => {
  const { uid, uname } = route.params;
  const width = useWindowDimensions().width;
  const [post, setpost] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    await db
      .collection("users")
      .doc(uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          let userData = snapshot.data();
          setUser(userData);
        } else {
          console.log("errors: snapshot not exist");
        }
      });
  };

  const fetchUserPosts = async () => {
    await db
      .collection("posts")
      .doc(uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.reverse().map((doc) => {
          const data = doc.data();
          //console.log(data.downloadURL);
          const id = doc.id;
          return { id, ...data };
        });
        setpost(posts);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchUser();
    fetchUserPosts();
    navigation.setOptions({ title: uname });
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
  //console.log(data + "it is data");
  const postsScreen = () => {
    return !loading ? (
      <FlatList
        style={{ paddingTop: 2 }}
        numColumns={3}
        horizontal={false}
        data={post}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          // <Text>{item.id} hello boys</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("userPosts", { post, index, user });
            }}
          >
            <Image
              source={{
                uri: item.downloadURL,
              }}
              style={{
                flex: 1,
                marginRight: 1.5,
                marginBottom: 1.5,
                width: width / 3,
                height: width / 3,
              }}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    ) : (
      <ActivityIndicator
        animating={true}
        color={"gray"}
        size="large"
        style={styles.centerContent}
      />
    );
  };
  const postsTaggedScreen = () => {
    return (
      <View style={styles.centerContent}>
        <Caption>No one has tagged {uname} in any posts</Caption>
        <Caption>(page is under development)</Caption>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* header */}
      <View>
        {/* Cover pic setion */}
        <View>
          <Image
            source={require("../../assets/background.jpg")}
            style={{
              height: useWindowDimensions().height / 3.5,
              width: useWindowDimensions().width,
              top: 0,
              // position: "absolute",
            }}
          />
          <IconButton
            icon="pencil"
            style={{
              position: "absolute",
              backgroundColor: "#fff9",
              bottom: -3,
              right: 1,
              elevation: 5,
            }}
            onPress={() => {
              console.log("press");
            }}
            size={20}
          />
        </View>

        <View style={styles.userRaw}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>245</Text>
            <Caption style={{ marginTop: -5 }}>Followers</Caption>
          </View>
          <Avatar.Image
            style={{ elevation: 10 }}
            size={90}
            source={require("../../assets/favicon.png")}
          />

          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>245</Text>
            <Caption style={{ marginTop: -5 }}>Following</Caption>
          </View>
        </View>

        {/*  name and post */}
        <View style={styles.userNameRaw}>
          <View style={{ alignItems: "flex-end", flex: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {user.Name}
            </Text>
            {/* <Caption style={{ marginTop: -5 }}>{user.Email}</Caption> */}
          </View>
          <Text
            style={{ marginTop: -5, color: "#cfcfcf", paddingHorizontal: 20 }}
            h3
          >
            |
          </Text>
          <View style={{ alignItems: "flex-start", flex: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>245</Text>
            <Caption style={{ marginTop: -5 }}>Posts</Caption>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Caption>
            Simplicity is the key to happiness. In a world of darkness look up
            at the stars All I do is win, win, win.
          </Caption>
        </View>

        <View style={styles.editProfile}>
          <Icon
            raised
            reverse
            name="account-edit"
            type="material-community"
            color="#84a59d"
            onPress={() => console.log("hello")}
          />
          <Icon
            raised
            reverse
            name="cog"
            type="material-community"
            color="#84a59d"
            onPress={() => console.log("hello")}
          />
          <Icon
            raised
            reverse
            name="email"
            type="material-community"
            color="#84a59d"
            onPress={() => console.log("hello")}
          />
          <Icon
            raised
            reverse
            name="logout"
            type="material-community"
            color="#84a59d"
            onPress={createTwoButtonAlert}
          />
        </View>
      </View>

      <Tab.Navigator
        style={{ flex: 1 }}
        tabBarOptions={{
          showIcon: true,
          showLabel: false,
          activeTintColor: "#84a59d",
          inactiveTintColor: "gray",
          indicatorStyle: {
            height: 2,
            backgroundColor: "#84a59d",
            // marginLeft: 10,
          },
        }}
      >
        <Tab.Screen
          name="Posts"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialIcons name="grid-on" size={24} color={color} />
            ),
          }}
          component={postsScreen}
        />
        <Tab.Screen
          name="TaggedPosts"
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="tag" size={24} color={color} />
            ),
          }}
          component={postsTaggedScreen}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  droidSafeArea: {
    paddingTop: Constants.statusBarHeight,
  },
  topContainer: {
    backgroundColor: "transparent",
    paddingTop: "30%",
  },
  userRaw: {
    marginTop: -45,
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20,
    marginBottom: 10,
    alignItems: "flex-end",
  },
  userNameRaw: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  editProfile: {
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  images: {
    flex: 1,
    marginLeft: 10,
    // width: useWindowDimensions().width / 3,
  },
  centerContent: { justifyContent: "center", alignItems: "center", flex: 1 },
});
export default userProfile;
