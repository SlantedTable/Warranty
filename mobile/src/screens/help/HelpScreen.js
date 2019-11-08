import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { API } from 'aws-amplify'

import { componentOrNothing } from '../../utils/componentOr'

import styles from './style'

export default class HelpScreen extends React.Component {
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
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text>Help Screen</Text>
        </View>
      </View>
    )
  }
}

HelpScreen.navigationOptions = {
  title: 'Help',
}
