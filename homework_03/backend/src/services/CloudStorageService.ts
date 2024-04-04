import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import { ICloudStorageService } from '../types';

class CloudStorageService implements ICloudStorageService {
  private storage: Storage;

  constructor() {
    this.storage = new Storage({
      projectId: process.env.GCLOUD_PROJECT_ID!,
      keyFilename: process.env.GCLOUD_STORAGE_ACCOUNT_CREDENTIALS!,
    });
  }

  async uploadObject(file: Express.Multer.File): Promise<string> {
    const bucket = this.storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_NAME!);
    const fileName = uuidv4();
    const fileUpload = bucket.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (err) => {
        reject(err);
      });

      stream.on('finish', () => {
        resolve(fileName);
      });

      stream.end(file.buffer);
    });
  }

  async getObject(fileName: string): Promise<string> {
    const bucket = this.storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_NAME!);
    const file = bucket.file(fileName);

    const [url] = await file.getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    });

    return url;
  }

  async deleteObject(fileName: string): Promise<void> {
    const bucket = this.storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_NAME!);
    const file = bucket.file(fileName);

    await file.delete();
  }
}

export const cloudStorageService = new CloudStorageService();
