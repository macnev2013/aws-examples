import boto3

client = boto3.client('s3',
    region_name='us-east-1',
    endpoint_url='http://s3.localhost.localstack.cloud:4566',
    aws_access_key_id="test",
    aws_secret_access_key="test"
)

bucket_name = "test-bucket1"
key_name = "test-key1"

client.create_bucket(Bucket=bucket_name)

client.put_object(
    ACL='private',
    Body=b'bytes',
    Bucket=bucket_name,
    Key=key_name,
)

client.copy_object(
    ACL='private',
    Bucket=bucket_name,
    CopySource={'Bucket': bucket_name, 'Key': key_name},
    Key=key_name + '-copy',
    CacheControl= 'max-age=2629746'
)