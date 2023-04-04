const products = require('./mock/products-mock');

module.exports.getProductsById = async (event) => {
  const { id } = event.pathParameters;
    return {
      statusCode: 200,
      params: id,
      body: JSON.stringify( products.products.find(product => product.id === id))
    };
  };