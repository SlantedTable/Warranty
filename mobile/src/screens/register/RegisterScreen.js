import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import {
  Button,
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native'

import styles from './style'

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      email: '',
      phone: '',
      given_name: '',
      family_name: '',
      password: '',
      confirmPassword: '',
      //   confirmationCode: "",
      newUser: null,
    }

    this.formatPhoneNumber = this.formatPhoneNumber.bind(this)
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.phone.length > 0 &&
      this.state.family_name.length > 0 &&
      this.state.given_name.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    )
  }

  //   validateConfirmationForm() {
  //     return this.state.confirmationCode.length > 0;
  //   }

  // handleChange = event => {
  //   this.setState({
  //     [event.nativeElement.id]: event.nativeElement.value
  //   });
  // }

  handleChange = (text, data) => {
    this.setState({ [text]: data })
  }

  formatPhoneNumber(phoneNumberString) {
    var x = phoneNumberString
    x = x.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '+01$1$2$3')
    return x
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    this.setState({ isLoading: true })

    try {
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password,
        attributes: {
          //phone_number: this.formatPhoneNumber(this.state.phone),   // optional - E.164 number convention
          //given_name: this.state.given_name,
          //family_name: this.state.family_name,
          email: this.state.email,
          name: this.state.family_name,
        },
      })
      this.setState({
        newUser,
      })
      this.props.navigation.navigate('Home')
    } catch (e) {
      alert(e.message)
    }

    this.setState({ isLoading: false })
  }

  //   handleConfirmationSubmit = async event => {
  //     event.preventDefault();

  //     this.setState({ isLoading: true });

  //     try {
  //       await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
  //       await Auth.signIn(this.state.email, this.state.password);

  //       this.props.userHasAuthenticated(true);
  //       this.props.history.push("/");
  //     } catch (e) {
  //       alert(e.message);
  //       this.setState({ isLoading: false });
  //     }
  //   }

  // componentDidMount() {
  // }

  // componentWillUnmount() {
  // }

  // onLoginPress() {

  // }

  // onRegisterPress() {

  // }

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.registerScreenContainer}>
            <View style={styles.registerFormView}>
              <Text style={styles.logoText}>Warranty</Text>
              <TextInput
                placeholder="First name"
                placeholderColor="#c4c3cb"
                style={styles.registerFormTextInput}
                onChangeText={(text) => this.handleChange('given_name', text)}
              >
                {this.state.given_name}
              </TextInput>
              <TextInput
                placeholder="Last name"
                placeholderColor="#c4c3cb"
                style={styles.registerFormTextInput}
                onChangeText={(text) => this.handleChange('family_name', text)}
              >
                {this.state.family_name}
              </TextInput>
              <TextInput
                placeholder="Email address"
                placeholderColor="#c4c3cb"
                style={styles.registerFormTextInput}
                onChangeText={(text) => this.handleChange('email', text)}
              >
                {this.state.email}
              </TextInput>
              <TextInput
                placeholder="Phone number"
                placeholderColor="#c4c3cb"
                style={styles.registerFormTextInput}
                onChangeText={(text) => this.handleChange('phone', text)}
              >
                {this.state.phone}
              </TextInput>
              <TextInput
                placeholder="Password"
                placeholderColor="#c4c3cb"
                style={styles.registerFormTextInput}
                secureTextEntry={true}
                onChangeText={(text) => this.handleChange('password', text)}
              >
                {this.state.password}
              </TextInput>
              <TextInput
                placeholder="Reenter password"
                placeholderColor="#c4c3cb"
                style={styles.registerFormTextInput}
                secureTextEntry={true}
                onChangeText={(text) =>
                  this.handleChange('confirmPassword', text)
                }
              >
                {this.state.confirmPassword}
              </TextInput>
              <Button
                buttonStyle={styles.registerButton}
                onPress={this.handleSubmit}
                title="Register"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  }
}
