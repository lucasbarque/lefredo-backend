import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  private s3: S3Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.s3 = new S3Client({
      region: 'us-east-1',
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_KEY'),
      },
    });

    this.bucketName = this.configService.get<string>('AWS_BUCKET_NAME');
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

      return `${this.configService.get<string>('AWS_PUBLIC_URL')}/${fileName}`;
    } catch (error) {
      console.error('Upload Error:', error);
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
    } catch (error) {
      console.error('Upload Error:', error);
      throw new Error('Error uploading file to S3');
    }
  }
}
