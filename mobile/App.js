import React from 'react'
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native'

import Amplify from 'aws-amplify'
import config from './config'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import LoginScreen from './src/screens/login/LoginScreen.js'
import HomeScreen from './src/screens/home/HomeScreen.js'
import RegisterScreen from './src/screens/register/RegisterScreen.js'
import CreateWarrantyScreen from './src/screens/warranty/CreateWarrantyScreen.js'

import AppNavigator from './src/navigation/AppNavigator'

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: 'warranty',
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
})

class SandboxScreen extends React.Component {
  render() {
    Amplify.configure(amplify)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Sandbox</Text>
      </View>
    )
  }
}

const AppContainer = createAppContainer(AppNavigator)

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuthenticated: false,
    }
  }

  userHasAuthenticated = (authenticated) => {
    this.setState({ isAuthenticated: authenticated })
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
    }

    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppContainer screenProps={childProps} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
