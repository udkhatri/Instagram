import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Alert,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import {
  Button,
  Avatar,
  Text,
  DefaultTheme,
  Appbar,
  ActivityIndicator,
  Caption,
} from "react-native-paper";

import { auth, db, fs } from "../../firebase";
import Constants from "expo-constants";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
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
    <SafeAreaView style={{ flex: 1 }}>
      {/* header */}

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
          <Text style={{ fontWeight: "bold" }}>{user.Name}</Text>
          <Text>{user.Email}</Text>
          <Text>{user.num}</Text>
        </View>
        <View style={styles.parent}>
          <Button
            style={styles.button}
            uppercase={false}
            mode="contained"
            theme={{
              colors: {
                ...DefaultTheme.colors,
                primary: "#4285f4",
                accent: "#f1c40f",
              },
            }}
          >
            Follow
          </Button>

          <Button style={styles.button} uppercase={false} mode="outlined">
            Message
          </Button>
        </View>
      </View>

      <Tab.Navigator
        style={{ flex: 1 }}
        tabBarOptions={{
          showIcon: true,
          showLabel: false,
          activeTintColor: "black",
          inactiveTintColor: "gray",
          indicatorStyle: { backgroundColor: "black" },
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
    backgroundColor: "#fff",
  },
  userRaw: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
  },
  button: {
    //padding: 18,
    width: "48%",
    borderRadius: 5,
    //height: 60,
  },
  editProfile: {
    marginHorizontal: 10,
  },
  images: {
    flex: 1,
    marginLeft: 10,
    // width: useWindowDimensions().width / 3,
  },
  container: {
    flex: 1,
  },
  parent: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 6,
    paddingTop: 15,
  },
  centerContent: { justifyContent: "center", alignItems: "center", flex: 1 },
});
export default userProfile;
