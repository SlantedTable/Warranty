import React from 'react'
import { ActivityIndicator } from 'react-native'

export const componentOr = (alternative) => (
  condition,
  component,
  props = {},
) =>
  condition ? component : alternative && React.cloneElement(alternative, props)

export const componentOrNothing = componentOr(null)

export const componentOrSpinner = componentOr(
  <ActivityIndicator size="large" color="#0000ff" />,
)
