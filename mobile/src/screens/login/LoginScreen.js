import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import {
  Button,
  Keyboard,
  View,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native'
import LogoImage from './LogoImage'

import styles from './style'

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
    this.setState({
      [text]: data,
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    this.setState({
      isLoading: true,
    })

    try {
      const user = await Auth.signIn({
        username: this.state.username,
        password: this.state.password,
      })

      this.setState({
        isLoading: false,
      })

      this.setState({
        user,
      })

      this.props.screenProps.userHasAuthenticated(true)

      this.props.navigation.navigate('Home')
    } catch (err) {
      alert(err.message)
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <Image
                source={{
                  uri: LogoImage,
                }}
                style={styles.logoImage}
              />
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
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => this.props.navigation.navigate('Register')}
              >
                <Text style={styles.registerButton}>Create an account?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={this.handleSubmit}
              >
                <Text style={styles.loginButton}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  }
}
