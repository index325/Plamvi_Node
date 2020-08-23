import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

interface IUploadConfig {
  driver: 's3' | 'disk';

  tmpFolder: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  // driver: process.env.STORAGE_PROVIDER, //TODO: PRECISAMOS DESCOBRIR O PQ process.env.STORAGE_PROVIDER ESTÁ RETORNANDO UNDEFINED AQUI, PORÉM EM OUTRO LUGAR, ELE RETORNA CORRETAMENTE
  driver: 'disk',
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const hash = crypto.randomBytes(10).toString('hex');

        const filename = `${hash}-${file.originalname}`;

        return callback(null, filename);
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: 'index325-app-plamvi',
    },
  },
} as IUploadConfig;