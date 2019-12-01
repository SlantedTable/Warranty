import * as dynamoDbLib from '../../../libs/dynamodb-lib'
import { success, failure } from '../../../libs/response-lib'

export async function main(event, context) {
  const params = {
    TableName: 'warranty',
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id
    //   of the authenticated user
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': event.requestContext.identity.cognitoIdentityId,
    },
  }

  try {
    let warranties = await dynamoDbLib.call('query', params)

    warranties.Items.sort((a, b) => {
      return new Date(a.expires_at) - new Date(b.expires_at)
    })

    // Return the matching list of items in response body
    return success(warranties.Items)
  } catch (e) {
    console.log(e)
    return failure({ e })
  }
}
