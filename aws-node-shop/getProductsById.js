import products from './mock/products-mock.js';

export async function getProductsById(event) {
  const { id } = event.pathParameters;
  const product = products.find(product => product.id === id);
  
  if (!product) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Product was not found"
      })
    }
  }
  
  return {
    statusCode: 200,
    headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
    body: JSON.stringify(product)
  };
};