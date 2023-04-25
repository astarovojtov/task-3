
import * as AWS from "aws-sdk";

export async function catalogBatchProcess(event) {
  console.info("catalogBatchProcess\n" + JSON.stringify(event, null, 2))
  const sns = new AWS.SNS({ region: 'us-east-1' });

  try {
    for (const record of event.Records) {
      const request = JSON.parse(record.body);
      const product = {
        title: request.title,
        description: request.description,
        price: parseInt(request.price),
        count: parseInt(request.count),
      }
    }

    return {
        status: 200,
        message: ""
    };
  } catch (error) {
    console.log("Error", error);
    return {
        status: 500,
        message: "Something went wrong"
    };
  }
};