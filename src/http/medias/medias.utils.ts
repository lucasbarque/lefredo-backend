import { HttpException, HttpStatus } from '@nestjs/common';
import { extname } from 'node:path';

export const imageFileFilter = (_, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)) {
    return callback(
      new HttpException('Media not allowed.', HttpStatus.BAD_REQUEST),
      false,
    );
  }
  callback(null, true);
};

export const getTypeByMimeType = (mimeType) => {
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
