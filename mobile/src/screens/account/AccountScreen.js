import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { API } from 'aws-amplify'

import { componentOrNothing } from '../../utils/componentOr'

import styles from './style'

export default class AccountScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      user: null,
    }
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    })
    this.fetchAccount()
  }

  fetchAccount = async () => {
    try {
      if (this.props.screenProps.isAuthenticated) {
        console.log('Fetch acocunt')
      } else {
        this.props.navigation.push('Login')
      }
    } catch (err) {
      console.log(err)
      alert(err)
    }
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text>Account Screen</Text>
        </View>
      </View>
    )
  }
}
