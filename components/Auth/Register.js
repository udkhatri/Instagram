import React from "react";
import { StyleSheet, View, StatusBar, Image, Alert } from "react-native";
import { Button, Text, TextInput, Snackbar } from "react-native-paper";
import { auth, db } from "../../firebase";

export default function signup({ navigation }) {
  const [num, setNum] = React.useState("");
  const [Name, setName] = React.useState("");
  const [securedpassword, setSecuredpassword] = React.useState(true);
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [color, setColor] = React.useState("#9d9d9d");

  //SnackBar manage
  const [label, setLabel] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const onSignUp = () => {
    auth
      .createUserWithEmailAndPassword(Email, Password)
      .then((result) => {
        auth.currentUser
          .sendEmailVerification()
          .then(() => {
            console.log("email send");
            onToggleSnackBar();
            visible ? "Hide" : "Show";
            setLabel(
              `Verification link has been sent at ${Email} verify from your mail to Login `
            );
          })
          .catch((error) => {
            console.log(error);
            onToggleSnackBar();
            visible ? "Hide" : "Show";
          });
        console.log(auth.currentUser.uid);
        if (auth.currentUser.emailVerified) {
          db.collection("users").doc(auth.currentUser.uid).set({
            Name,
            Email,
            num,
          });
          console.log(result);
        } else {
          setLabel(
            `reset password link send back to at your this ${Email} mail id `
          );
          onToggleSnackBar();
          visible ? "Hide" : "Show";
        }
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
        <Text style={{ fontSize: 40, marginBottom: 20 }}>Sign up</Text>
        <TextInput
          label="Name"
          value={Name}
          onChangeText={(text) => setName(text)}
          style={{ paddingBottom: 20 }}
          mode="outlined"
        />
        <TextInput
          label="Phone number"
          mode="outlined"
          type="number"
          keyboardType="numeric"
          maxLength={10}
          value={num}
          onChangeText={(text) => setNum(text)}
          style={{ paddingBottom: 20 }}
        />

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

        <Button style={styles.button} mode="contained" onPress={onSignUp}>
          Sign up
        </Button>
        <Button
          uppercase={false}
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          already have an account? Login here
        </Button>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Undo",
          onPress: () => {
            navigation.navigate("Login");
          },
        }}
      >
        {label}
      </Snackbar>
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
