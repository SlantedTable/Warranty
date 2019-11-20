import React, { Component } from 'react'
import { Text, View, Button, Image } from 'react-native'
import { API, Auth } from 'aws-amplify'

import { componentOrSpinner } from '../../utils/componentOr'
import ProfileImage from './ProfileImage'
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
        let user = await Auth.currentAuthenticatedUser({
          bypassCache: false,
        })
        this.setState({
          isLoading: false,
          user: user.attributes,
        })
      } else {
        this.props.navigation.push('Login')
      }
    } catch (err) {
      console.log(err)
      alert(err)
    }
  }

  render() {
    const user = this.state.user || {}

    return componentOrSpinner(
      !this.state.isLoading,
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Image
            source={{
              uri: ProfileImage,
            }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.bodyContainerText}>Name: {user.name}</Text>
          <Text style={styles.bodyContainerText}>Email: {user.email}</Text>
          <Text style={styles.bodyContainerText}>Phone: 123-456-7891</Text>
        </View>
        <View style={styles.footerContainer}>
          <Button
            title="Logout"
            onPress={() => {
              this.props.screenProps.userHasAuthenticated(false)
              this.props.navigation.navigate('Login')
            }}
          />
        </View>
      </View>,
    )
  }
}

AccountScreen.navigationOptions = {
  title: 'Account',
}
