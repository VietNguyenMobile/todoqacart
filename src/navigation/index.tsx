import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import auth from "@react-native-firebase/auth";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import Loading from "../screens/LoadingScreen";
import TasksScreen from "../screens/TasksScreen";

export type RootParamType = {
  Auth: undefined;
  Main: undefined;
  Loading: undefined;
};

export type AuthParamType = {
  Login: undefined;
  Signup: undefined;
};

export type MainParamType = {
  Tasks: undefined;
};

const Stack = createNativeStackNavigator<RootParamType>();

const AuthStack = createNativeStackNavigator<AuthParamType>();

const MainStack = createNativeStackNavigator<MainParamType>();

const AuthenticationNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  );
};

const AppNavigationContainer = () => {
  const [user, setUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUser(user);
      setIsLoading(false);
    });
    return () => {
      console.log("unmount");
      clearInterval();
    };
  }, [user]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isLoading ? (
          <Stack.Screen name="Loading" component={Loading} />
        ) : user ? (
          <Stack.Screen name="Main" component={TasksScreen} />
        ) : (
          <Stack.Screen name="Auth" component={AuthenticationNavigator} />
        )}
        {/* {user ? <MainNavigator /> : <AuthenticationNavigator />} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
