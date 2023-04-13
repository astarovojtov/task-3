//import products from './mock/products-mock.js';
import AWS from 'aws-sdk'
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function getProductsList(event) {
  console.log(event);
  const products = await dynamoScan(process.env.PRODUCT_TABLE);
  const stock = await dynamoScan(process.env.STOCK_TABLE);

  products.map( product => {
    const correspondingStock = stock.find( stock => stock.product_id === product.id );
    product.count =  correspondingStock && correspondingStock.count ? correspondingStock.count : 0;
  });

  return {
    statusCode: 200,
    body: JSON.stringify(products),
  };
}

async function dynamoScan(tableName) {
  const items = await dynamoDb.scan({
    TableName: tableName
  }).promise();
  return items.Items;
}