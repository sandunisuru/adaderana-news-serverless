export const DataStorageBucket = {
    Type: 'AWS::S3::Bucket',
    Properties: {
        BucketName: 'adaderana-serverless-data-storage',
        VersioningConfiguration: {
            Status: 'Enabled'
        },
        PublicAccessBlockConfiguration: {
            BlockPublicAcls: true,
            BlockPublicPolicy: true,
            IgnorePublicAcls: true,
            RestrictPublicBuckets: true
        },
        
    }
}