exports.validate = (method, data) => {
  const requirements = requirementsCurry(data)

  const isTrue = (val) => val
  return requirements(method).every(isTrue)
}

const requirementsCurry = (data) => (method) => {
  const existsInData = existsIn(data)

  switch (method) {
    case 'create': {
      return [existsInData('name'),existsInData('purchase_date'),existsInData('warranty_length'),existsInData('product_number'),existsInData('extended_warranty_period')]
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
