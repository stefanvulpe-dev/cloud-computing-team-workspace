import {
  BlobSASPermissions,
  BlobServiceClient,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
} from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';
import { ICloudStorageService } from '../types';
import { secretClient } from './azure';

const storageAccountName = await secretClient.getSecret('storage-account-name');
const storageAccountKey = await secretClient.getSecret('storage-account-key');

class CloudStorageService implements ICloudStorageService {
  // private storage: Storage;
  private blobServiceClient: BlobServiceClient;

  constructor() {
    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      `DefaultEndpointsProtocol=https;AccountName=${storageAccountName.value};AccountKey=${storageAccountKey.value};EndpointSuffix=core.windows.net`,
    );
  }

  async uploadObject(file: Express.Multer.File): Promise<string> {
    const containerClient =
      this.blobServiceClient.getContainerClient('recipe-images');

    const blobName = uuidv4();
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(file.buffer, {
      blobHTTPHeaders: {
        blobContentType: file.mimetype,
      },
    });

    return blobName;
  }

  async getObject(fileName: string): Promise<string> {
    const containerClient =
      this.blobServiceClient.getContainerClient('recipe-images');
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    const sasToken = generateBlobSASQueryParameters(
      {
        containerName: 'recipe-images',
        blobName: fileName,
        permissions: BlobSASPermissions.parse('r'), // 'r' for read permissions
        startsOn: new Date(),
        expiresOn: new Date(new Date().valueOf() + 86400), // 24 hours later
      },
      new StorageSharedKeyCredential(
        storageAccountName.value!,
        storageAccountKey.value!,
      ),
    ).toString();

    return `${blockBlobClient.url}?${sasToken}`;
  }

  async deleteObject(fileName: string): Promise<void> {
    const containerClient =
      this.blobServiceClient.getContainerClient('recipe-images');
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    await blockBlobClient.delete();
  }

  /*async uploadObject(file: Express.Multer.File): Promise<string> {
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
  }*/
}

export const cloudStorageService = new CloudStorageService();
