import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Amplify from 'aws-amplify';
import amplify from ;

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './src/screens/login/LoginScreen.js';
import HomeScreen from './src/screens/home/HomeScreen.js';
import RegisterScreen from './src/screens/register/RegisterScreen.js';

class TestScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
  },
  {
    initialRouteName: 'Login',
  }
);


const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

// export default class App extends React.Component {
//   render() {
//     return (
//       <LoginScreen />
//     );
//   }
// }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
