import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

@Injectable()
export class R2Service {
  private s3: S3Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.s3 = new S3Client({
      region: 'auto',
      endpoint: this.configService.get<string>('R2_ENDPOINT'),
      credentials: {
        accessKeyId: this.configService.get<string>('R2_ACCESS_KEY'),
        secretAccessKey: this.configService.get<string>('R2_SECRET_KEY'),
      },
    });

    this.bucketName = this.configService.get<string>('R2_BUCKET_NAME');
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

      return `${this.configService.get<string>('R2_PUBLIC_URL')}/${fileName}`;
    } catch (error) {
      console.error('R2 Upload Error:', error);
      throw new Error('Error uploading file to R2');
    }
  }
}
