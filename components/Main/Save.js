import React, { useState } from "react";
import firebase from "firebase/app";
require("firebase/firebase-storage");
import { View, Text, Alert, Image, StyleSheet } from "react-native";
import { Button, TextInput, ProgressBar, Colors } from "react-native-paper";
import { auth, db, fs } from "../../firebase";

const Save = (props) => {
  console.log(props.route.params.image);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const uploadImage = async () => {
    console.log("uploading");
    setLoading(true);
    const uri = props.route.params.image;
    const childPath = `post/${auth.currentUser.uid}/${Math.random().toString(
      36
    )}`;
    console.log(childPath);

    const responce = await fetch(uri);
    const blob = await responce.blob();

    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      console.log("progress");
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
        console.log(snapshot);
      });
    };

    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const savePostData = (downloadURL) => {
    db.collection("posts")
      .doc(auth.currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        caption,
        creation: fs.FieldValue.serverTimestamp(),
      })
      .then(function () {
        props.navigation.popToTop();
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.SquareShapeView}>
        <Image source={{ uri: props.route.params.image }} style={{ flex: 1 }} />
        {/* <ProgressBar progress={0.5} color={Colors.Grey900} visible={true} /> */}
      </View>

      <View style={{ width: "90%", marginTop: 10 }}>
        <TextInput
          placeholder="Write a caption"
          mode="outlined"
          dense={false}
          value={caption}
          onChangeText={(text) => setCaption(text)}
          multiline={true}
          numberOfLines={5}
        />

        <Button
          icon="upload"
          loading={loading}
          mode="contained"
          onPress={() => uploadImage()}
          style={{ marginTop: 20 }}
        >
          {loading ? null : <Text>Post</Text>}
        </Button>
      </View>
    </View>
  );
};
export default Save;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFF",
  },

  SquareShapeView: {
    width: 192,
    height: 256,

    backgroundColor: "#fff",
  },
});
