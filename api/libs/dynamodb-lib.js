import AWS from 'aws-sdk'

export function call(action, params) {
  const config = new AWS.DynamoDB({ region: 'us-east-1' })

  const dynamoDb = new AWS.DynamoDB.DocumentClient({ service: config })

  return dynamoDb[action](params).promise()
}
