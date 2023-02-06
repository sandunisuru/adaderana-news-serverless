import { AWS } from 'utilities';
const s3 = new AWS.S3({ region: 'us-east-1' });

export const s3PutFile = async (bucketName: string, key: string, fileContent: any) => {
    try {
        await s3.putObject({
            Key: key,
            Bucket: bucketName,
            Body: Buffer.from(fileContent),
            ContentType: 'application/json'
        }).promise();
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}

export const s3GetFile = async(bucketName: string, key: string) => {
    try {
        return s3.getObject({
            Bucket: bucketName,
            Key: key
        }).promise();
    } catch (error) {
        console.log(error)
        return null;
    }
}