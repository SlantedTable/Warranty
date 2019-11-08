const React = require('react-native')

const { StyleSheet } = React

export default {
  mainContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    textAlign: 'center',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'stretch',
  },
  warrantyTable: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  warrantyRow: {
    flexDirection: 'row',
  },
  warrantyCell: {
    flex: 1,
    alignSelf: 'stretch',
    borderWidth: 0.5,
    borderColor: 'black',
  },
}
