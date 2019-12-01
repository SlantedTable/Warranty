const React = require('react-native')

const { StyleSheet } = React

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  bodyContainer: {
    flex: 1,
    paddingTop: 20,
  },
  bodyContainerText: {
    fontSize: 24,
  },
  profileImage: {
    width: 200,
    height: 200,
    overflow: 'hidden',
    borderRadius: 100,
    marginTop: 20,
  },
  footerContainer: {
    marginBottom: 20,
  },
})
