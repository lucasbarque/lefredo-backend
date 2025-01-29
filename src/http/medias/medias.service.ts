import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { R2Service } from './r2.service'; // Import the R2Service
import { getTypeByMimeType } from './medias.utils';
import { UploadFilesInput } from './upload-files-input';

interface CreateMediaParams {
  body: {
    type: string;
    referenceId: string;
    referenceName: string;
  };
  files: Array<Express.Multer.File>;
}

@Injectable()
export class MediasService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private r2Service: R2Service,
  ) { }


  async uploadFiles({ body, files }: CreateMediaParams) {
    try {
      const mediaData = await Promise.all(
        files.map(async (file) => {
          const fileUrl = await this.r2Service.uploadFile(file.buffer, file.originalname, file.mimetype);

          return {
            title: file.originalname.replace(/\.(jpg|png|gif)\b/, ''),
            type: getTypeByMimeType(file.mimetype),
            referenceId: body.referenceId,
            referenceName: body.referenceName,
            filename: fileUrl,
          };
        }),
      );

      return await this.prisma.media.createMany({ data: mediaData });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to upload files');
    }
  }

  async getMediasByReferenceName(referenceName: string, referenceId: string) {
    const mediasFromDatabase = await this.prisma.media.findMany({
      where: {
        referenceName,
        referenceId,
      },
    });

    const medias = mediasFromDatabase.map((media) => {
      return {
        title: media.title,
        url: media.filename,
      };
    });

    return medias;
  }

  async uploadMediaByUrl(body: UploadFilesInput) {
    try {
      return await this.prisma.media.create({
        data: {
          title: body.title,
          type: body.type,
          referenceId: body.referenceId,
          referenceName: body.referenceName,
          filename: body.filename,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
