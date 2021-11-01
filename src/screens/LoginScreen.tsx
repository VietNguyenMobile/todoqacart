import React, { useState, FunctionComponent } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import auth from "@react-native-firebase/auth";
import {
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Logo from "../components/Logo";
import { testProps } from "../utils/testProps";

import { AuthParamType } from "../navigation";

export type LoginScreenProps = NativeStackScreenProps<AuthParamType, "Login">;

const LoginScreen: FunctionComponent<LoginScreenProps> = ({
  navigation,
  route,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        setErrorMessage(error.message);
      });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <View style={styles.loginContainer}>
          <TextInput
            {...testProps("email")}
            style={styles.textInput}
            placeholder="Enter your Email"
            value={email}
            onChangeText={value => setEmail(value)}
            // accessibilityLabel="email" // android and ios
            // testID="email" // ios
          />
          <TextInput
            style={styles.textInput}
            {...testProps("password")}
            // testID="password"
            placeholder="Enter your Password"
            value={password}
            onChangeText={value => setPassword(value)}
            secureTextEntry={true}
          />
          {isLoading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              {...testProps("login")}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          )}

          {errorMessage ? (
            <Text {...testProps("error")} style={styles.error}>
              {errorMessage}
            </Text>
          ) : null}

          <TouchableOpacity
            {...testProps("signup")}
            style={styles.signupButton}
            onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b262c",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginContainer: {
    flex: 2,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "#fff",
    marginBottom: 20,
    width: "80%",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 100,
  },
  loginButton: {
    width: "80%",
    backgroundColor: "#ed6663",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 100,
  },
  signupButton: {
    width: "80%",
    backgroundColor: "#ffa372",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 100,
    marginTop: 20,
  },
  buttonText: {
    color: "#1b262c",
    textAlign: "center",
  },
  error: {
    marginVertical: 20,
    color: "red",
    fontSize: 18,
    textAlign: "center",
    padding: 30,
  },
});

export default LoginScreen;
