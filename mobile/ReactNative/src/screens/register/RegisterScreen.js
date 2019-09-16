import React, { Component } from "react";

import styles from "./style";
import { Auth } from "aws-amplify";
import { Button, Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView } from 'react-native';


export default class RegisterScreen extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          isLoading: false,
          email: "",
          phone: "",
          given_name: "",
          family_name: "",
          password: "",
          confirmPassword: "",
        //   confirmationCode: "",
          newUser: null
        };
    
        this.formatPhoneNumber = this.formatPhoneNumber.bind(this);
      }

    validateForm() {
        return (
          this.state.email.length > 0 &&
          this.state.phone.length > 0 &&
          this.state.family_name.length > 0 &&
          this.state.given_name.length > 0 &&
          this.state.password.length > 0 &&
          this.state.password === this.state.confirmPassword
        );
      }
    
    //   validateConfirmationForm() {
    //     return this.state.confirmationCode.length > 0;
    //   }
    
      handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }

      formatPhoneNumber(phoneNumberString) {
        var x = phoneNumberString;
        x = x.replace(/\D+/g, '')
            .replace(/(\d{3})(\d{3})(\d{4})/, '+01$1$2$3');
        return x;
      }
    
      handleSubmit = async event => {
        event.preventDefault();
    
        this.setState({ isLoading: true });
    
        try {
          const newUser = await Auth.signUp({
            username: this.state.email,
            password: this.state.password,
            attributes: {
              phone_number: this.formatPhoneNumber(this.state.phone),   // optional - E.164 number convention
              given_name: this.state.given_name,
              family_name: this.state.family_name,
            }
          });
          this.setState({
            newUser
          });
          this.props.navigation.navigate('Home')
        } catch (e) {
          alert(e.message);
        }
    
        this.setState({ isLoading: false });
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
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup controlId="given_name" bsSize="large">
                                <ControlLabel>First Name</ControlLabel>
                                <FormControl
                                    type="given_name"
                                    value={this.state.given_name}
                                    onChange={this.handleChange}
                                />
                                </FormGroup>
                                <FormGroup controlId="family_name" bsSize="large">
                                <ControlLabel>Last Name</ControlLabel>
                                <FormControl
                                    type="family_name"
                                    value={this.state.family_name}
                                    onChange={this.handleChange}
                                />
                                </FormGroup>
                                <FormGroup controlId="email" bsSize="large">
                                <ControlLabel>Email</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                </FormGroup>
                                <FormGroup controlId="phone" bsSize="large">
                                <ControlLabel>Phone Number</ControlLabel>
                                <FormControl
                                    type="phone"
                                    value={this.state.phone}
                                    onChange={this.handleChange}
                                />
                                </FormGroup>
                                <FormGroup controlId="password" bsSize="large">
                                <ControlLabel>Password</ControlLabel>
                                <li><small>At least 6 characters</small></li>
                                <li><small>Include a number & special character</small></li>
                                <li><small>Include upper and lowercase letters</small></li>
                                <FormControl
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    type="password"
                                />
                                </FormGroup>
                                <FormGroup controlId="confirmPassword" bsSize="large">
                                <ControlLabel>Confirm Password</ControlLabel>
                                <FormControl
                                    value={this.state.confirmPassword}
                                    onChange={this.handleChange}
                                    type="password"
                                />
                                </FormGroup>
                                <LoaderButton
                                block
                                bsSize="large"
                                disabled={!this.validateForm()}
                                type="submit"
                                isLoading={this.state.isLoading}
                                text="Signup"
                                loadingText="Signing up…"
                                />
                            </form>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }

}