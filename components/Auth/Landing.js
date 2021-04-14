import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const Landing = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate("Login")}
      >
        Log in
      </Button>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate("Register")}
      >
        Sign up
      </Button>
      <Button
        style={styles.button}
        mode="outlined"
        onPress={() => console.log("fb")}
      >
        facebook
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 9,
    width: "90%",
    bottom: 20,
    position: "absolute",
    alignSelf: "center",
  },
  button: {
    paddingVertical: 5,
    marginVertical: 10,
  },
});
export default Landing;
