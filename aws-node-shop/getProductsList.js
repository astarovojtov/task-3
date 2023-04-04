const products = require('./mock/products-mock');

module.exports.getProductsList = async (event) => {
    return {
      statusCode: 200,
      // body: JSON.stringify(
      //   {
      //     output: products,
      //     message: "getProductsList",
      //     input: event,
      //   },
      //   null,
      //   2
      // )
      body: JSON.stringify(products.products),
    };
  };