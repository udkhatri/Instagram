import React from "react";
import { StyleSheet, View, StatusBar, Image, Alert } from "react-native";
import { Button, Text, TextInput, Snackbar } from "react-native-paper";
import { auth } from "../../firebase";

export default function Login({ navigation }) {
  const [num, setNum] = React.useState("");
  const [Name, setName] = React.useState("");
  const [securedpassword, setSecuredpassword] = React.useState(true);
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [label, setLabel] = React.useState("");
  const [color, setColor] = React.useState("#9d9d9d");

  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const onPasswordReset = () => {
    auth
      .sendPasswordResetEmail(Email)
      .then(() => {
        onToggleSnackBar();
        visible ? "Hide" : "Show";
        setLabel(
          `reset password link send back to at your this ${Email} mail id `
        );
      })
      .catch((error) => {
        setLabel(error);
        onToggleSnackBar();
        visible ? "Hide" : "Show";
      });
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

        <Button
          style={styles.button}
          mode="contained"
          onPress={onPasswordReset}
        >
          Verify
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
