import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import {
  Button,
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
} from 'react-native'

import styles from './style'
import { navigateAndReset } from '../../utils/navigateAndReset'

export default class LoginScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      username: '',
      password: '',
      user: null,
    }
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0
  }

  handleChange(text, data) {
    this.setState({ [text]: data })
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    this.setState({ isLoading: true })

    try {
      const user = await Auth.signIn({
        username: this.state.username,
        password: this.state.password,
      })

      this.setState({
        user,
      })

      this.props.screenProps.userHasAuthenticated(true)

      this.props.navigation.navigate('Home')
    } catch (err) {
      alert(err.message)
    }

    this.setState({ isLoading: false })
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <Text style={styles.logoText}>Warranty Countdown</Text>
              <TextInput
                autoCapitalize="none"
                placeholder="Username"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                onChangeText={(text) => this.handleChange('username', text)}
                value={this.state.username}
              />
              <TextInput
                autoCapitalize="none"
                placeholder="Password"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                secureTextEntry={true}
                onChangeText={(text) => this.handleChange('password', text)}
                value={this.state.password}
              />
              <Button
                buttonStyle={styles.loginButton}
                onPress={this.handleSubmit}
                title="Login"
              />
              <Button
                buttonStyle={styles.registerButton}
                onPress={() => this.props.navigation.navigate('Register')}
                title="Register"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  }
}
