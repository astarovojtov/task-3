import AWS from 'aws-sdk';
AWS.config.update({region:'us-east-1'});
const dynamoDb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
import crypto from 'crypto';

export async function createProduct(event) {
    const request = JSON.parse(event.body);
    const uuid = crypto.randomUUID();
    const product = {
        'id': {S: uuid },
        'title': {S: request.title.toString()},
        'description' : {S: request.description.toString()},
        'price' : {N: request.price.toString()}
    };
    const stock = {
        'product_id': { S: uuid },
        'count': { N: request.count.toString() }
    }

    const productParams = {
        TableName: process.env.PRODUCT_TABLE,
        Item: product
    }
	
    const stockParams = {
        TableName: process.env.STOCK_TABLE,
        Item: stock
    }

    const createdProduct = await dynamoDb.putItem(productParams, function(err, data) {
        if (err) return  err;
        if (data) return data;
    }).promise();

    const createdStock = await dynamoDb.putItem(stockParams, function(err, data) {
        if (err) return  err;
        if (data) return data;
    }).promise();

    return { 
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify({
            product: createdProduct,
            stock: createdStock
        })
    }
}