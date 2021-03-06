exports.validate = (method, data) => {
  const requirements = requirementsCurry(data)

  const isTrue = (val) => val
  return requirements(method).every(isTrue)
}

const requirementsCurry = (data) => (method) => {
  const existsInData = existsIn(data)

  switch (method) {
    case 'create': {
      return [
        existsInData('name'),
        existsInData('purchase_date'),
        existsInData('product_number'),
        existsInData('expires_at')
      ]
    }
    default: {
      return []
    }
  }
}

const existsIn = (data) => (key) => {
  return key in data
}

const isDate = (string) => {}
