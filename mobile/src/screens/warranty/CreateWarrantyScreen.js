import React, { Component } from 'react'
import { Auth, API, Storage } from 'aws-amplify'
import {
  Button,
  Image,
  Text,
  Picker,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
} from 'react-native'
import DatePicker from 'react-native-datepicker'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import styles from './style'
import { ScrollView } from 'react-native-gesture-handler'

export default class CreateWarrantyScreen extends React.Component {
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
          "purchase_date": "this.state.purchase_date",
          "warranty_length": this.state.warranty_length,
          "product_number": this.state.product_number,
          "extended_warranty_period": this.state.extended_warranty_period,
          "image": this.state.upload_time
        }
      });

      this.setState({ isLoading: false });

      this.props.navigation.navigate('Home');
    } catch (err) {
      alert(err.message)
    }
  }

  s3Upload = async (event) => {
    
    const filename = Date.now();
    this.setState({ upload_time: filename });
  
    const stored = await Storage.put(filename + ".png", this.state.file);
  
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
            <Text style={styles.warrantyLengthText}>Purchase Date (MM/DD/YYYY)</Text>
            {/* <DatePicker
              style={styles.calenderButton}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              // minDate="2016-05-01"
              // maxDate="2016-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
              }}
              onDateChange={(date) => {
                this.setState({ purchase_date: date })
              }}
            /> */}
            <TextInput
              autoCapitalize="none"
              placeholder="Purchase Date"
              placeholderColor="#c4c3cb"
              style={styles.warrantyFormTextInput}
              onChangeText={(text) => this.setState({ purchase_date: text })}
              value={this.state.purchase_date}
            />
            <Text style={styles.warrantyLengthText}>Warranty Length</Text>
            <Picker
              selectedValue={this.state.warranty_length}
              style={styles.warrantyLengthPicker}
              onValueChange={(itemValue) =>
                this.setState({ warranty_length: itemValue })
              }
            >
              <Picker.Item label="Swipe Up" value="0" />
              <Picker.Item label="1 Month" value="1" />
              <Picker.Item label="2 Months" value="2" />
              <Picker.Item label="3 Months" value="3" />
              <Picker.Item label="4 Months" value="4" />
              <Picker.Item label="5 Months" value="5" />
              <Picker.Item label="6 Months" value="6" />
              <Picker.Item label="7 Months" value="7" />
              <Picker.Item label="8 Months" value="8" />
              <Picker.Item label="9 Months" value="9" />
              <Picker.Item label="10 Months" value="10" />
              <Picker.Item label="11 Months" value="11" />
              <Picker.Item label="12 Months" value="12" />
              <Picker.Item label="13 Months" value="13" />
              <Picker.Item label="14 Months" value="14" />
              <Picker.Item label="15 Months" value="15" />
              <Picker.Item label="16 Months" value="16" />
              <Picker.Item label="17 Months" value="17" />
              <Picker.Item label="18 Months" value="18" />
              <Picker.Item label="19 Months" value="19" />
              <Picker.Item label="20 Months" value="20" />
              <Picker.Item label="21 Months" value="21" />
              <Picker.Item label="22 Months" value="22" />
              <Picker.Item label="23 Months" value="23" />
              <Picker.Item label="24 Months" value="24" />
            </Picker>
            <TextInput
              autoCapitalize="none"
              placeholder="Product Number"
              placeholderColor="#c4c3cb"
              style={styles.warrantyFormTextInput}
              onChangeText={(text) => this.setState({ product_number: text })}
              value={this.state.product_number}
            />
            <TextInput
              autoCapitalize="none"
              placeholder="Extended Warranty Period"
              placeholderColor="#c4c3cb"
              style={styles.warrantyFormTextInput}
              onChangeText={(text) => this.setState({ extended_warranty_period: text })}
              value={this.state.extended_warranty_period}
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