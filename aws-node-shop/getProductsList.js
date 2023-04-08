import products from './mock/products-mock.js';

export async function getProductsList(event) {
    return {
      statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
      body: JSON.stringify(products),
    };
  }