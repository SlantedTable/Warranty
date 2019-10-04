import React from "react";

export const componentOr = alternative => (condition, component, props = {}) =>
  condition ? component : alternative && React.cloneElement(alternative, props);

export const componentOrNothing = componentOr(null);
