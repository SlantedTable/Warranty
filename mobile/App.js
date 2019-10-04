import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Amplify from "aws-amplify";
import config from "./config";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import LoginScreen from "./src/screens/login/LoginScreen.js";
import HomeScreen from "./src/screens/home/HomeScreen.js";
import RegisterScreen from "./src/screens/register/RegisterScreen.js";
import WarrantyScreen from "./src/screens/warranty/WarrantyScreen.js";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "notes",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      }
    ]
  }
});

class TestScreen extends React.Component {
  render() {
    Amplify.configure(amplify);
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Test Screen 2</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Test: TestScreen,
    Login: LoginScreen,
    Home: HomeScreen,
    Register: RegisterScreen,
    Warranty: WarrantyScreen
  },
  {
    initialRouteName: "Login"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
