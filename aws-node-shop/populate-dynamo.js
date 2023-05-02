// Load the AWS SDK for Node.js
import AWS from 'aws-sdk';
// Load credentials and set Region from JSON file
//AWS.config.loadFromPath('./config.json');
AWS.config.update({region:'us-east-1'});
// Create DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var productTableName = 'Product-dev';

var params = {
  TableName: productTableName,
  Item: {'id': {S: 'sdf1-sdfsdf-sdfsdf'}, 'title': {S: 'Dummy Soooo much wow'}, 'description' : {S: 'Dummy Welp'}, 'price' : {N: '9.99'}
  }
};
post();

var params = {
    TableName: productTableName,
    Item: {'id': {S: 'sdfsdfs2'}, 'title': {S: 'Ysdf Not so cool'}, 'description' : {S: 'uh oh'}, 'price' : {N: '2.99'}
    }
  };
  post();

function post () {
  ddb.putItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
}