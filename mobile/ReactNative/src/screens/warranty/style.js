const React = require("react-native");

const { StyleSheet } = React;

export default {


containerView: {
  alignItems: 'center',
  flex: 1,
},
warrantyScreenContainer: {
  flex: 1,
},
logoText: {
  fontSize: 40,
  fontWeight: "800",
  marginTop: 150,
  marginBottom: 30,
  textAlign: 'center',
},
imagePicker: {
  alignSelf: 'center', 
  justifyContent:'center',
},
warrantyLengthText: {
  fontSize: 20,
  fontWeight: "200",
  marginTop: 30,
  marginBottom: 30,
  textAlign: 'center',
},
warrantyLengthPicker: {
  height: 43,
  width: 200,
  alignSelf: 'center', 
  justifyContent:'center',
},
warrantyFormView: {
  flex: 1
},
warrantyFormTextInput: {
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

},
calenderButton: {
  width: 200,
  alignSelf: 'center', 
  justifyContent:'center',
},
registerButton: {
  backgroundColor: '#3897f1',
  borderRadius: 5,
  height: 45,
  marginTop: 10,
  padding: '10',
},

};