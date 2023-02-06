import { s3GetFile } from "@libs/AWSHelper";
import { middyfy } from "@libs/lambda";
import { APIGatewayEvent, APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
const { BUCKET_NAME } = process.env;
const fileKey = "news_data.json";

const getNews: any = async () => {
    const newsBuffer = await s3GetFile(BUCKET_NAME, fileKey);
    const news = JSON.parse(newsBuffer.Body.toString());
    return {
        statusCode: 200,
        body: JSON.stringify({
            news
        }, null, 2)
    };
}

export const main = middyfy(getNews);