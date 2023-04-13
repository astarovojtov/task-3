import AWS from 'aws-sdk';
import crypto from 'crypto';
AWS.config.update({region:'us-east-1'});
const dynamoDb = new AWS.DynamoDB.DocumentClient();


export async function createProduct(event) {
    console.log(event);
    const request = JSON.parse(event.body);

    if (!request.title || isNaN(request.price) || isNaN(request.count)) {
        return { 
            statusCode: 400,
            body: JSON.stringify({
                message: 'Missing required fields'
            })
        }
    }

    const uuid = crypto.randomUUID();
    const product = {
        'id': uuid,
        'title': request.title,
        'description': request.description,
        'price': request.price
    };

    const stock = {
        product_id: uuid,
        count: request.count
    }

    let createdProduct, createdStock;

    try {
        createdProduct = await putProduct(product);
        createdStock = await putStock(stock);
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'DB error' 
            })
        }
    }

    return { 
        statusCode: 200,
        body: JSON.stringify({
            product: createdProduct,
            stock: createdStock
        })
    }
}

async function putProduct(product) { 
    return await dynamoDb.put({
        TableName: process.env.PRODUCT_TABLE,
        Item: product,
    }).promise()
};

async function putStock(stock) {
    return await dynamoDb.put({
        TableName: process.env.STOCK_TABLE,
        Item: stock,
    }).promise()
}