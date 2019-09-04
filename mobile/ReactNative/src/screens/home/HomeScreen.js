import React, { Component } from "react";
import styles from "./style";
import {Button, Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';


export default class Homescreen extends Component {

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
              buttonStyle={styles.logoutButton}
              onPress= { () => this.props.navigation.navigate('Login')}
              title="Logout"
            />
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }


}
