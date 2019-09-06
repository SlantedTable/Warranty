import React, { Component } from "react";

import styles from "./style";
import { Button, Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView } from 'react-native';


export default class RegisterScreen extends Component {

    render() {
        return (
            <KeyboardAvoidingView style={styles.containerView} behavior="padding">

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.registerScreenContainer}>
                        <View style={styles.registerFormView}>
                            <Text style={styles.logoText}>Warranty</Text>
                            <TextInput placeholder="First name" placeholderColor="#c4c3cb" style={styles.registerFormTextInput} />
                            <TextInput placeholder="Last lame" placeholderColor="#c4c3cb" style={styles.registerFormTextInput} />
                            <TextInput placeholder="Email address" placeholderColor="#c4c3cb" style={styles.registerFormTextInput} />
                            <TextInput placeholder="Phone number" placeholderColor="#c4c3cb" style={styles.registerFormTextInput} />
                            <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.registerFormTextInput} />
                            <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.registerFormTextInput} secureTextEntry={true} />
                            <TextInput placeholder="Reenter password" placeholderColor="#c4c3cb" style={styles.registerFormTextInput} /> secureTextEntry={true} />
                            <Button
                                buttonStyle={styles.registerButton}
                                onPress={() => this.props.navigation.navigate('Home')}
                                title="Register"
                            />
                            <Button
                                buttonStyle={styles.loginButton}
                                onPress={() => this.props.navigation.navigate('Login')}
                                title="Login"
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    onLoginPress() {

    }

    onRegisterPress() {

    }

}