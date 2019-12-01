import React, { Component } from 'react'
import { API, Auth } from 'aws-amplify'
import {
  Button,
  Image,
  Text,
  View,
  TextInput,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import { ScrollView } from 'react-native-gesture-handler'

import styles from './style'
import { componentOrSpinner } from '../../utils/componentOr'

export default class EditWarrantyScreen extends React.Component {
  state = {
    isLoading: false,
    warranty: null,
  }

  constructor(props) {
    super(props)
    this.state = { isLoading: false, warranty: null }
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    })
    this.getPermissionAsync()
    this.fetchWarranty(this.props.navigation.getParam('warrantyId'))
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!')
      }
    }
  }

  fetchWarranty = async (warrantyId) => {
    try {
      if (this.props.screenProps.isAuthenticated) {
        const warranty = await API.get('warranty', `/warranty/${warrantyId}`)

        this.setState({
          isLoading: false,
        })
        this.setState({
          warrantyId: warranty.warrantyId,
          name: warranty.name,
          purchase_date: warranty.purchase_date,
          expires_at: warranty.expires_at,
          product_number: warranty.product_number,
        })
      } else {
        this.props.navigation.push('Login')
      }
    } catch (err) {
      console.log(err)
      alert(err)
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    this.setState({ isLoading: true })

    try {
      const attachment = this.state.image
        ? await this.s3Upload(this.state.image)
        : null

      await API.post('warranty', '/warranty', {
        body: {
          name: this.state.name,
          purchase_date: this.state.purchase_date,
          product_number: this.state.product_number,
          expires_at: this.state.expires_at,
          image: this.state.upload_time,
        },
      })

      this.setState({ isLoading: false })

      this.props.navigation.navigate('Home')
    } catch (err) {
      alert(err.message)
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    })

    if (!result.cancelled) {
      this.setState({ image: result.uri })
    }
  }

  deleteWarranty = async (warrantyId) => {
    try {
      let response = await API.del('warranty', `/warranty/${warrantyId}`)
      this.props.navigation.navigate('Home')
      alert('Warranty deleted')
    } catch (err) {
      console.log(err)
      alert(err)
    }
  }

  render() {
    let { image } = this.state

    return componentOrSpinner(
      !this.state.isLoading,
      <ScrollView>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Warranty</Text>
            <TextInput
              autoCapitalize="none"
              placeholder="Product Name"
              placeholderColor="#c4c3cb"
              style={styles.warrantyFormTextInput}
              onChangeText={(text) => this.setState({ name: text })}
              value={this.state.name}
            />
            <Button
              title="Pick an image from camera roll"
              onPress={this._pickImage}
            />
            {this.state.image && (
              <Image
                source={{ uri: this.state.image }}
                style={{
                  width: 200,
                  height: 200,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}
              />
            )}
            <TextInput
              autoCapitalize="none"
              placeholder="Purchase Date (MM/DD/YYYY)"
              placeholderColor="#c4c3cb"
              style={styles.warrantyFormTextInput}
              onChangeText={(text) => this.setState({ purchase_date: text })}
              value={this.state.purchase_date}
            />
            <TextInput
              autoCapitalize="none"
              placeholder="Exipres At (MM/DD/YYYY)"
              placeholderColor="#c4c3cb"
              style={styles.warrantyFormTextInput}
              onChangeText={(text) => this.setState({ expires_at: text })}
              value={this.state.expires_at}
            />
            <TextInput
              autoCapitalize="none"
              placeholder="Product Number"
              placeholderColor="#c4c3cb"
              style={styles.warrantyFormTextInput}
              onChangeText={(text) => this.setState({ product_number: text })}
              value={this.state.product_number}
            />

            <Button
              onPress={() => {
                this.deleteWarranty(this.state.warrantyId)
              }}
              title="Delete Warranty Item"
            >
              Delete Warranty Item
            </Button>
            <Button
              onPress={
                this.handleSubmit
              }
              title="Update Warranty Item"
            >
              Update Warranty Item
            </Button>
          </View>
        </View>
      </ScrollView>,
    )
  }
}

EditWarrantyScreen.navigationOptions = ({ navigation }) => ({
  title: 'Edit Warranty',
  headerRight: (
    <Button
      onPress={() => navigation.navigate('Home')}
      title="Back"
      color="#000"
    />
  ),
})
