import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MediasService } from './medias.service';
import { UploadFilesInput } from './dto/upload-files-input';
import { imageFileFilter } from './medias.utils';
import { memoryStorage } from 'multer';
import { ClerkAuthGuard } from '../auth/guards/clerk-auth.guard';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UploadFileResponse } from './dto/upload-file-response.dto';
import { UploadSingleFileDTO } from './dto/upload-single-file.dto';

@Controller('medias')
export class MediasController {
  constructor(private mediasService: MediasService) {}

  @Post('upload-single-file')
  @UseGuards(ClerkAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Upload single file ',
    operationId: 'uploadSingleFile',
  })
  @ApiCreatedResponse({
    type: UploadFileResponse,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      fileFilter: imageFileFilter,
    }),
  )
  @ApiOkResponse()
  async uploadSingleFile(
    @Body() body: UploadSingleFileDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.mediasService.uploadFile({ body, file });
  }

  @Post('upload-files')
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

  // @Post('upload-url')
  // async uploadMediaByUrl(@Body() body: UploadFilesInput) {
  //   return await this.mediasService.uploadMediaByUrl(body);
  // }
}
