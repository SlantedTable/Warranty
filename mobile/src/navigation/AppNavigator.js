import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import LoginScreen from '../screens/login/LoginScreen'

import MainTabNavigator from './MainTabNavigator'

export default createSwitchNavigator({
  Login: LoginScreen,
  Main: MainTabNavigator,
})
