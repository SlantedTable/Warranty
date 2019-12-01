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

  var seconds = (millisec / 1000).toFixed(1);

  var minutes = (millisec / (1000 * 60)).toFixed(1);

  var hours = (millisec / (1000 * 60 * 60)).toFixed(1);

  var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

  var years = (millisec / (1000 * 60 * 60 * 24 * 365)).toFixed(1);

  if (seconds < 60) {
      return seconds + " seconds";
  } else if (minutes < 60) {
      return minutes + " minutes";
  } else if (hours < 24) {
      return hours + " hours";
  } else if (days < 365) {
    return days + " days"
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
    console.log(warranty)
    const expireDate = warranty.expires_at * 1000
    const currDate = Date.now()

    console.log({expireDate, currDate, diff: expireDate - currDate})
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
