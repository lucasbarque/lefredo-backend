import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { env } from 'src/env';

@Injectable()
export class S3Service {
  private s3: S3Client;
  private bucketName: string;

  constructor() {
    this.s3 = new S3Client({
      region: env.AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY,
        secretAccessKey: env.AWS_SECRET_KEY,
      },
    });
    this.bucketName = env.AWS_BUCKET_NAME;
  }

  async uploadFile(
    fileBuffer: Buffer,
    fileName: string,
    mimetype: string,
  ): Promise<string> {
    try {
      await this.s3.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          Key: fileName,
          Body: fileBuffer,
          ContentType: mimetype,
          ACL: 'public-read',
        }),
      );

      return `${env.AWS_PUBLIC_URL}/${fileName}`;
    } catch {
      throw new Error('Error uploading file to S3');
    }
  }

  async deleteFile(fileName: string) {
    try {
      await this.s3.send(
        new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key: fileName,
        }),
      );
    } catch {
      throw new Error('Error uploading file to S3');
    }
  }
}
