import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/database/prisma/prisma.service';

import { getTypeByMimeType } from './medias.utils';

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
  ) {}

  async uploadFiles({ body, files }: CreateMediaParams) {
    try {
      const mediaData = files.map((file) => {
        return {
          title: file.originalname.replace(/\.(jpg|png|gif)\b/, ''),
          type: getTypeByMimeType(file.mimetype),
          referenceId: body.referenceId,
          referenceName: body.referenceName,
          filename: file.filename,
        };
      });

      return await this.prisma.media.createMany({
        data: mediaData,
      });
    } catch (error) {
      console.log(error);
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
        url: `${this.configService.get('BASE_URL')}/files/${media.filename}`,
      };
    });

    return medias;
  }
}
