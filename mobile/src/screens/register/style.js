const React = require('react-native')

const { StyleSheet } = React

export default StyleSheet.create({
  containerView: {
    flex: 1,
  },
  registerScreenContainer: {
    flex: 1,
    marginTop: 100,
  },
  logoImage: {
    width: 320,
    height: 146,
  },
  titleText: {
    fontSize: 35,
    textAlign: 'center',
  },
  registerFormView: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
  },
  registerFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
    width: 320,
  },
  loginButton: {
    fontSize: 12,
    color: '#007AFF',
    borderRadius: 5,
    marginTop: 5,
  },
  registerButton: {
    fontSize: 24,
    color: '#007AFF',
    borderRadius: 5,
    marginTop: 5,
  },
})
