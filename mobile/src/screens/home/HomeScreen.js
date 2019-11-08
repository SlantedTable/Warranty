import React, { Component } from 'react'
import { Text, View, Button, ActivityIndicator } from 'react-native'
import { API } from 'aws-amplify'

import WarrantyItem from './WarrantyItem'
import { componentOr } from '../../utils/componentOr'

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
    return (
      <WarrantyItem
        key={warranty.warrantyId}
        warranty={warranty}
      ></WarrantyItem>
    )
  }

  componentOrSpinner = componentOr(
    <ActivityIndicator size="large" color="#0000ff" />,
  )

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text>Home Screen</Text>
        </View>

        <View style={styles.bodyContainer}>
          {this.componentOrSpinner(
            !this.state.isLoading,
            <View style={styles.warrantyTable}>
              {this.state.warranties.map((warranty) =>
                this.renderRow(warranty),
              )}
            </View>,
          )}
        </View>
      </View>
    )
  }
}

HomeScreen.navigationOptions = ({ navigation }) => ({
  title: 'Warranties',
  headerRight: (
    <Button
      onPress={() => navigation.navigate('Warranty')}
      title="New"
      color="#000"
    />
  ),
})
