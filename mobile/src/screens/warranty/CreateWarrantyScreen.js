import React, { Component } from 'react'
import { API, Storage } from 'aws-amplify'
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
import styles from './style'
import { ScrollView } from 'react-native-gesture-handler'

export default class CreateWarrantyScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      purchase_date: "",
      warranty_length: "",
      product_number: "",
      extended_warranty_period: "",
      image: null,
      file: null,
      upload_time: ""
    };
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    })

    console.log(result)
    const response = await fetch(result.uri)
    const blob = await response.blob()
    this.setState({ file: blob });

    if (!result.cancelled) {
      this.setState({ image: result.uri })
    }
  }

  validateForm() {
    return this.state.name.length > 0
      && this.state.purchase_date.length > 0
      && this.state.warranty_length.length > 0
      && this.state.product_number.length > 0
      && this.state.extended_warranty_period.length > 0
  }

  handleChange(text, data) {
    this.setState({ [text]: data })
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      const attachment = this.state.image
        ? await this.s3Upload(this.state.image)
        : null;

      await API.post("warranty", "/warranty", {
        body: {
          "name": this.state.name,
          "purchase_date": this.state.purchase_date,
          "product_number": this.state.product_number,
          "image": this.state.upload_time,
          "expires_at": this.state.expires_at
        }
      });

      this.setState({ isLoading: false });

      this.props.navigation.navigate('Home');
    } catch (err) {
      alert(err.message)
    }
  }

  s3Upload = async (image) => {
    const filename = Date.now();
    this.setState({ upload_time: filename });

    const stored = await Storage.put(filename + ".png", image);

    return stored.key;
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>New Warranty</Text>
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
              onPress={this.handleSubmit}
              title="Create Warranty"
            />
            <Button
              onPress={() => this.props.navigation.navigate('Home')}
              title="Cancel"
            />
          </View>
        </View>
      </ScrollView>
    )
  }

  componentDidMount() {
    this.getPermissionAsync()
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!')
      }
    }
  }
}

CreateWarrantyScreen.navigationOptions = ({ navigation }) => ({
  title: 'New Warranty',
  headerRight: (
    <Button
      onPress={() => navigation.navigate('Home')}
      title="Back"
      color="#000"
    />
  ),
})
