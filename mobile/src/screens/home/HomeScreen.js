import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { API } from 'aws-amplify'

import WarrantyItem from './WarrantyItem'
import { componentOrNothing } from '../../utils/componentOr'

import styles from './style'

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      warranties: [],
    }
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    })
    this.fetchWarranties()
  }

  fetchWarranties = async () => {
    try {
      if (this.props.screenProps.isAuthenticated) {
        const warranties = await API.get('warranty', '/warranty')

        this.setState({
          isLoading: false,
          warranties,
        })
      } else {
        this.props.navigation.push('Login')
      }
    } catch (err) {
      console.log(err)
      alert(err)
    }
  }

  renderRow(warranty) {
    // return <WarrantyItem warranty={warranty} />
    return <WarrantyItem warranty={warranty}></WarrantyItem>
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text>Home Screen</Text>

          <Button
            title="Logout"
            onPress={() => {
              this.props.screenProps.userHasAuthenticated(false)
              this.props.navigation.push('Login')
            }}
          />
          <Button
            title="Add Warranty"
            onPress={() => this.props.navigation.push('Warranty')}
          />
          {componentOrNothing(this.state.isLoading, <Text>Loading...</Text>)}
        </View>

        <View style={styles.warrantyTable}>
          <View key={'column_names'} style={styles.warrantyRow}>
            <View style={styles.warrantyCell}>
              <Text>Title</Text>
            </View>
            <View style={styles.warrantyCell}>
              <Text>Expires At</Text>
            </View>
          </View>
          {this.state.warranties.map((warranty) => this.renderRow(warranty))}
        </View>
      </View>
    )
  }
}
