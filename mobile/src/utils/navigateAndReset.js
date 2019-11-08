import { StackActions, NavigationActions } from 'react-navigation'

export const navigateAndReset = (routeName) =>
  StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName })],
  })
