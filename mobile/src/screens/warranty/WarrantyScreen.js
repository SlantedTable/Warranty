import React, { Component } from "react";
import { Auth, API } from "aws-amplify";
import {
  Button,
  Image,
  Text,
  Picker,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import DatePicker from "react-native-datepicker";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import styles from "./style";
import { ScrollView } from "react-native-gesture-handler";

export default class WarrantyScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      purchase_date: "",
      warranty_length: "",
      product_number: "",
      extended_warranty_period: ""
    };

    this.addWarranty = this.addWarranty.bind(this);
    this.createWarranty = this.createWarranty.bind(this);
  }
  state = {
    image: null
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  async addWarranty() {
    try {
      await this.createWarranty();
      this.props.navigation.push('Home');
    } catch (e) {
      alert(e);
    }
  }
  
  createWarranty() {
    return API.post("warranty", "/warranty", {
      body: {
        "name": this.state.name,
        "purchase_date": this.state.purchase_date,
        "warranty_length": this.state.warranty_length,
        "product_number": this.state.product_number,
        "extended_warranty_period": this.state.extended_warranty_period
      }
    });
  }

  render() {
    let { image } = this.state;
    return (
      <ScrollView>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>New Warranty</Text>
            <TextInput
              placeholder="Product Name"
              placeholderColor="#c4c3cb"
              style={styles.warrantyFormTextInput}
            />
            <Button
              title="Pick an image from camera roll"
              onPress={this._pickImage}
            />
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  width: 200,
                  height: 200,
                  alignSelf: "center",
                  justifyContent: "center"
                }}
              />
            )}
            <Text style={styles.warrantyLengthText}>Purchase Date</Text>
            <DatePicker
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
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={date => {
                this.setState({ date: date });
              }}
            />
            <Text style={styles.warrantyLengthText}>Warranty Length</Text>
            <Picker
              selectedValue={this.state.language}
              style={styles.warrantyLengthPicker}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ language: itemValue })
              }
            >
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
              placeholder="Product Number"
              placeholderColor="#c4c3cb"
              style={styles.warrantyFormTextInput}
            />
            <TextInput
              placeholder="Extended Warranty Period"
              placeholderColor="#c4c3cb"
              style={styles.warrantyFormTextInput}
            />
          </View>
          <Button
            title="Add Warranty"
            onPress={() => this.addWarranty()}
          />
        </View>
      </ScrollView>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
}
