import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LoginScreen from './src/screens/login/LoginScreen.js'
import Homescreen from './src/screens/home/HomeScreen.js';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default class App extends React.Component {
  render() {
    return (
      //<LoginScreen />
      <AppContainer />
    );
  }
}

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//     </View>
//   );
// }

const AppStackNavigator = createStackNavigator (
{
  Login: LoginScreen,
  Home: Homescreen
},
{
    initialRouteName: Login
}
);

const AppContainer = createAppContainer(AppStackNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
