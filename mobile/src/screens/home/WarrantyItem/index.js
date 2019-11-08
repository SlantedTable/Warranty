import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { API } from 'aws-amplify'

import { componentOrNothing } from '../../../utils/componentOr'

import styles from './style'

export default class WarrantyItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View key={this.props.warranty.warrantyId} style={styles.warrantyRow}>
        <View style={styles.warrantyCell}>
          <Text>{this.props.warranty.name}</Text>
        </View>
        <View style={styles.warrantyCell}>
          <Text>{this.props.warranty.expiresAt}</Text>
        </View>
      </View>
    )
  }
}
