import React, { Component } from 'react'
import { Platform, Text, View, Button } from 'react-native'
import { API } from 'aws-amplify'
import { ListItem } from 'react-native-elements'

import { Ionicons } from '@expo/vector-icons'

import Colors from '../../../constants/colors'

import styles from './style'

const timeConversion  = function(millisec) {
  if (millisec < 0) {
    return "Expired"
  }

  var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

  var weeks = (millisec / (1000 * 60 * 60 * 24 * 7)).toFixed(1);

  var months = (millisec / (1000 * 60 * 60 * 24 * 7 * 4.3)).toFixed(1);

  var years = (millisec / (1000 * 60 * 60 * 24 * 7 * 4.3 * 12)).toFixed(1);

  if (days < 7) {
    return days + " days"
  } else if (weeks < 4.3) {
    return weeks + " weeks"
  } else if (months < 12) {
    return months + " months"
  } else {
    return years + " years"
  }
}

export default class WarrantyItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const warranty = this.props.warranty
    const expireDate = new Date(warranty.expires_at)
    const currDate = Date.now()

    return (
      <ListItem
        containerStyle={styles.warrantyItem}
        titleStyle={styles.titleStyle}
        title={warranty.name}
        subtitle={timeConversion(expireDate - currDate)}
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
        onPress={() =>
          this.props.navigation.navigate('EditWarrantyScreen', {
            warrantyId: warranty.warrantyId,
          })
        }
      />
    )
  }
}
