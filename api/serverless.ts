import type { AWS } from '@serverless/typescript';

import newsFetcher from '@functions/newsFetcher';
import getNews from '@functions/getNews';
import { DataStorageBucket } from './resources/s3';

const serverlessConfiguration: AWS = {
  service: 'adaderana-serverless',
  frameworkVersion: '2',
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      BUCKET_NAME: 'adaderana-serverless-data-storage'
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Resource: ['arn:aws:s3:::adaderana-serverless-data-storage/*'],
        Action: ['s3:GetObject', 's3:PutObject']
      }
    ]
  },
  // import the function via paths
  functions: { newsFetcher, getNews },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      DataStorageBucket
    }
  },
  plugins: ['serverless-offline', 'serverless-esbuild']
};

module.exports = serverlessConfiguration;
