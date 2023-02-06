import { middyfy } from '@libs/lambda';
import { Context, ScheduledEvent } from 'aws-lambda';
import { AWS, _ } from 'utilities';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { NewsItem } from 'src/models/newsItem';
import { s3PutFile } from '@libs/AWSHelper';

const { BUCKET_NAME } = process.env;

const newsFetcher: any = async (event: ScheduledEvent, context: Context) => {
  let news: NewsItem[] = [];
  const webContent = await axios.get("https://www.adaderana.lk/hot-news/");
  const $ = cheerio.load(webContent.data, { decodeEntities: false });
  $('div.news-story div.story-text h2.visible-xs').find('a').each((i: number, elem: any) => {
    var newsItem: NewsItem = {
      title: elem.children[0]['data'],
      url: elem.attribs.href
    }
    news.push(newsItem);
  })

  $('div.news-story div.story-text div.thumb-image').find('img').each((i: number, elem: any) => {
    news[i].thumbnail = elem.attribs.src;
  })

  $('div.news-story div.story-text').find('p').each((i: number, elem: any) => {
    news[i].body = _.replace(elem.children[0]['data'], "MORE..", "");
  })

  $('div.news-story div.story-text div.comments').find('span').each((i: number, elem: any) => {
    news[i].dateTime = _.replace(elem.children[0]['data'], "| ", "");
  })

  const key = "news_data.json";
  var jsonBuffer = Buffer.from(JSON.stringify(news));
  
  await s3PutFile(BUCKET_NAME, key, jsonBuffer);
}

export const main = middyfy(newsFetcher);
