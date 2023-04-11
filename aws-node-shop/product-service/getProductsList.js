//import products from './mock/products-mock.js';
import AWS from 'aws-sdk'
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function getProductsList(event) {
  const products = await dynamoDb.scan({
    TableName: process.env.PRODUCT_TABLE,
  }).promise();

  return {
    statusCode: 200,
      headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
    body: JSON.stringify(products.Items),
  };
}