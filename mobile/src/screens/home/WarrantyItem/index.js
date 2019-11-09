import React, { Component } from 'react'
import { Platform, Text, View, Button } from 'react-native'
import { API } from 'aws-amplify'
import { ListItem } from 'react-native-elements'

import { Ionicons } from '@expo/vector-icons'

import Colors from '../../../constants/colors'

import styles from './style'

export default class WarrantyItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ListItem
        containerStyle={styles.warrantyItem}
        titleStyle={styles.titleStyle}
        title={this.props.warranty.name}
        subtitle={this.props.warranty.name}
        leftAvatar={
          <Ionicons
            name={
              Platform.OS === 'ios'
                ? `ios-information-circle`
                : 'md-information-circle'
            }
            size={26}
            color={Colors.tabIconDefault}
          />
        }
        bottomDivider
        chevron
        onPress={() => this.props.navigation.navigate('EditWarranty')}
      />
    )
  }
}
