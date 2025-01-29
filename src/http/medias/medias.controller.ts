import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RestAuthGuard } from 'src/http/auth/guards/rest-jwt-auth.guard';
import { MediasService } from './medias.service';
import { UploadFilesInput } from './upload-files-input';
import { imageFileFilter } from './medias.utils';
import { memoryStorage } from 'multer';

@Controller('medias')
export class MediasController {
  constructor(private mediasService: MediasService) { }

  @Post('upload-files')
  @UseGuards(RestAuthGuard)
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: memoryStorage(),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadFiles(
    @Body() body: UploadFilesInput,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return await this.mediasService.uploadFiles({ body, files });
  }

  @UseGuards(RestAuthGuard)
  @Post('upload-url')
  async uploadMediaByUrl(@Body() body: UploadFilesInput) {
    return await this.mediasService.uploadMediaByUrl(body);
  }
}
