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

export const editFileName = (req, file, callback) => {
  const { referenceName } = req.body;

  const fileExtName = extname(file.originalname);
  const randomName = Array(16)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${referenceName}-${randomName}${fileExtName}`);
};

export const getTypeByMimeType = (mimeType) => {
  switch (mimeType) {
    case 'image/png':
    case 'image/avif':
    case 'image/jpeg':
    case 'image/webp':
      return 'image';

    default:
      return 'undefined';
  }
};
