import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import LoginScreen from '../screens/login/LoginScreen'
import WarrantyScreen from '../screens/warranty/WarrantyScreen'
import RegisterScreen from '../screens/register/RegisterScreen'
import EditWarranty from '../screens/warranty/EditWarranty'

import MainTabNavigator from './MainTabNavigator'

export default createSwitchNavigator(
  {
    Warranty: WarrantyScreen,
    Login: LoginScreen,
    Main: MainTabNavigator,
    Register: RegisterScreen,
    EditWarranty: EditWarranty,
  },
  {
    initialRouteName: 'Login',
  },
)
