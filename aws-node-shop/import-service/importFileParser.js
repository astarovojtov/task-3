import AWS from 'aws-sdk';
const S3 = new AWS.S3({ region: 'us-east-1'});
import csv from 'csv-parser'

export async function importFileParser(event) {
    console.log('Object uploaded');
    try {
        for (const record of event.Records) {
            const key = record.s3.object.key;

            const s3Stream = S3.getObject({
                Bucket: process.env.IMPORT_BUCKET,
                Key: key
            }).createReadStream();

            const parse = new Promise((res, rej) => {
                s3Stream.pipe(csv())
                .on("open", () => console.log('Parsing'))
                .on("data", (data) => console.log(`Parsed data: ${JSON.stringify(data)}`))
                .on("error", (err) => {
                    console.log('Error'); 
                    return rej(err)
                })
                .on("end", async () => {
                    console.log('Done');
                    return res();
                })
            });

            await parse;

            await S3.copyObject({
                Bucket: process.env.IMPORT_BUCKET,
                CopySource: `${process.env.IMPORT_BUCKET}/${key}`,
                Key: key.replace('uploaded', 'parsed')
            }).promise();
            console.log('Copied')

            await S3.deleteObject({
                Bucket: process.env.IMPORT_BUCKET,
                Key: key
            }).promise();
            console.log('Deleted');
        }

        return {
            status: 200,
            body: "Seems like it worked"
        }
    } catch (e) {
        return {
            status: 500,
            message: JSON.stringify(e)
        }
    }
}