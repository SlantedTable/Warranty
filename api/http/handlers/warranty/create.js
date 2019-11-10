// Create warranty handler
import uuid from 'uuid'
import * as dynamoDbLib from '../../../libs/dynamodb-lib'
import { success, failure } from '../../../libs/response-lib'

import { validate } from '../../validators/warranty'

export async function main(event, context) {
  const data = JSON.parse(event.body || '{}')

  if (!validate('create', data)) {
    return failure({
      message: 'Invalid parameters',
    })
  }

  const {
    name,
    purchase_date,
    warranty_length,
    product_number,
    extended_warranty_period,
    image
  } = data

  const params = {
    TableName: 'warranty',
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      warrantyId: uuid.v1(),
      createdAt: Date.now(),
      name,
      purchase_date,
      warranty_length,
      product_number,
      extended_warranty_period,
      image
    },
  }

  try {
    await dynamoDbLib.call('put', params)
    return success(params.Item)
  } catch (e) {
    return failure({ e, status: false })
  }
}
