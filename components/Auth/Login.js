import React from "react";
import { StyleSheet, View, StatusBar, Image, Alert } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { auth } from "../../firebase";

export default function Login({ navigation }) {
  const [num, setNum] = React.useState("");
  const [Name, setName] = React.useState("");
  const [securedpassword, setSecuredpassword] = React.useState(true);
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [color, setColor] = React.useState("#9d9d9d");
  const onSignin = () => {
    auth
      .signInWithEmailAndPassword(Email, Password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const eyeColor = () => {
    if (!securedpassword) {
      setColor("#9d9d9d");
    } else {
      setColor("#3d3d3d");
    }
  };
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={styles.container}>
        <Text style={{ fontSize: 40, marginBottom: 20 }}>Sign in</Text>

        <TextInput
          label="Email"
          value={Email}
          onChangeText={(text) => setEmail(text)}
          type="email"
          keyboardType="email-address"
          style={{ paddingBottom: 20 }}
          mode="outlined"
        />

        <TextInput
          Password
          label="Password"
          value={Password}
          onChangeText={(text) => setPassword(text)}
          style={{ paddingBottom: 20 }}
          mode="outlined"
          secureTextEntry={securedpassword}
          right={
            <TextInput.Icon
              icon={"eye"}
              size={30}
              color={color}
              onPress={() => {
                setSecuredpassword(!securedpassword);
                eyeColor();
              }}
            />
          }
        />

        <Button style={styles.button} mode="contained" onPress={onSignin}>
          Sign in
        </Button>
        <Button
          uppercase={false}
          style={styles.button}
          onPress={() => navigation.navigate("Register")}
        >
          Don't have account? Signup here
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    flex: 1,
    justifyContent: "flex-end",
  },
  image: {
    alignSelf: "center",
  },
  button: {
    paddingVertical: 5,
    marginVertical: 10,
  },
});
