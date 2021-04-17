import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Colors, Divider, DefaultTheme } from "react-native-paper";

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
      <Divider />
      <Text style={{ fontWeight: "bold", alignSelf: "center", marginTop: 10 }}>
        Or continue with
      </Text>
      <Button
        style={styles.button}
        mode="contained"
        icon="google"
        compact={true}
        onPress={() => console.log("fb")}
        theme={{
          colors: {
            ...DefaultTheme.colors,
            primary: "#4285f4",
            accent: "#f1c40f",
          },
        }}
      >
        Google
      </Button>
      <Button
        style={styles.button}
        mode="contained"
        icon="facebook"
        compact={true}
        onPress={() => console.log("fb")}
        theme={{
          colors: {
            ...DefaultTheme.colors,
            primary: "#3b5998",
            accent: "#f1c40f",
          },
        }}
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
    marginVertical: 10,
    paddingVertical: 5,
  },
});
export default Landing;
