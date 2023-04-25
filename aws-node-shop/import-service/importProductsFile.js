import AWS from 'aws-sdk';
import stream from 'stream';
const S3 = new AWS.S3({ region: 'us-east-1'});
const BUCKET = process.env.IMPORT_BUCKET;

export async function importProductsFile(event) {
    const fileName = event.queryStringParameters && event.queryStringParameters.name ? 
        event.queryStringParameters.name : '';
    if (!fileName) {
        return {
            status: 500,
            body: JSON.stringify({
                message: 'File name is missing',
                event: event
            })
        }
    }

    const params = {
        Bucket: BUCKET,
        Key: `uploaded/${fileName}`,
        Expires: 3600,
        ContentType: 'text/csv'
    }

    const signedUrl = await S3.getSignedUrl('putObject', params);
    return {
        status: 200,
        body: signedUrl
    };

}