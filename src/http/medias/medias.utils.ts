import { HttpException, HttpStatus } from '@nestjs/common';
import { FileFilterCallback } from 'multer';
import { Request } from 'express';

export const imageFileFilter = (
  _: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
): void => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
    throw new HttpException('Media not allowed.', HttpStatus.BAD_REQUEST);
  }
  callback(null, true);
};

export const getTypeByMimeType = (mimeType: string) => {
  switch (mimeType) {
    case 'image/png':
    case 'image/avif':
    case 'image/jpeg':
    case 'image/svg+xml':
    case 'image/webp':
      return 'image';

    default:
      return 'undefined';
  }
};
