import { S3Client } from "@aws-sdk/client-s3";
const region = config.aws.aws_default_region;
const s3Client = new S3Client({region});
export { s3Client };