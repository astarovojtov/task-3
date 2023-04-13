import products from '../mock/products-mock.js';

export async function getProductsById(event) {
  console.log(event);
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
    body: JSON.stringify(product)
  };
};