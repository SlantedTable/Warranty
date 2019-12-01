import React, { Component } from 'react'
import { ScrollView, View, Platform } from 'react-native'
import { API } from 'aws-amplify'
import { Ionicons } from '@expo/vector-icons'

import WarrantyItem from './WarrantyItem'
import { componentOrSpinner } from '../../utils/componentOr'

import styles from './style'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class HomeScreen extends Component {
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

        console.log(warranties)

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
        navigation={this.props.navigation}
      ></WarrantyItem>
    )
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.bodyContainer}>
          {componentOrSpinner(
            !this.state.isLoading,
            <View style={styles.warrantyTable}>
              {this.state.warranties.map((warranty) =>
                this.renderRow(warranty),
              )}
            </View>,
          )}
        </ScrollView>
      </View>
    )
  }
}

HomeScreen.navigationOptions = ({ navigation }) => ({
  title: 'Warranties',
  headerRight: (
    <TouchableOpacity
      onPress={() => navigation.navigate('Warranty')}
    >
      <Ionicons
        name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
        style={styles.newButton}
        size={32}
      />
    </TouchableOpacity>
  ),
})
