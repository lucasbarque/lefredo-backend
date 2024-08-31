import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { RestAuthGuard } from 'src/http/auth/guards/rest-jwt-auth.guard';

import { MediasService } from './medias.service';
import { editFileName, imageFileFilter } from './medias.utils';
import { UploadFilesInput } from './upload-files-input';

@Controller('medias')
export class MediasController {
  constructor(private mediasService: MediasService) {}

  @UseGuards(RestAuthGuard)
  @Post('upload-files')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadFiles(
    @Body() body: UploadFilesInput,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return await this.mediasService.uploadFiles({ body, files });
  }
}
