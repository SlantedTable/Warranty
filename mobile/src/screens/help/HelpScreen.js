import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { API } from 'aws-amplify'

import styles from './style'
import LogoImage from '../login/LogoImage'

export default class HelpScreen extends Component {
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
        <View>
          <Image
            source={{
              uri: LogoImage,
            }}
            style={styles.logoImage}
          />
        </View>
      </View>
    )
  }
}

HelpScreen.navigationOptions = {
  title: 'Help',
}
