import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import LoginScreen from '../screens/login/LoginScreen'
import CreateWarrantyScreen from '../screens/warranty/CreateWarrantyScreen'
import RegisterScreen from '../screens/register/RegisterScreen'
import EditWarrantyScreen from '../screens/warranty/EditWarrantyScreen'

import MainTabNavigator from './MainTabNavigator'

export default createSwitchNavigator(
  {
    Warranty: CreateWarrantyScreen,
    Login: LoginScreen,
    Main: MainTabNavigator,
    Register: RegisterScreen,
    EditWarrantyScreen: EditWarrantyScreen,
  },
  {
    initialRouteName: 'Login',
  },
)
