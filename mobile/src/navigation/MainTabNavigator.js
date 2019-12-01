import React from 'react'
import { Platform } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/home/HomeScreen'
import HelpScreen from '../screens/help/HelpScreen'
import AccountScreen from '../screens/account/AccountScreen'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
})

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config,
)

HomeStack.navigationOptions = {
  tabBarLabel: 'Warranties',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-list`
          : 'md-list'
      }
    />
  ),
}

HomeStack.path = ''

const HelpStack = createStackNavigator(
  {
    Help: HelpScreen,
  },
  config,
)

HelpStack.navigationOptions = {
  tabBarLabel: 'Help',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
}

HelpStack.path = ''

const AccountStack = createStackNavigator(
  {
    Account: AccountScreen,
  },
  config,
)

AccountStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
}

AccountStack.path = ''

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  AccountStack,
})

tabNavigator.path = ''

export default tabNavigator
