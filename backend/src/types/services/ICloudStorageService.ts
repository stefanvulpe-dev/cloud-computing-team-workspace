export interface ICloudStorageService {
  uploadObject(file: Express.Multer.File): Promise<string>;
  deleteObject(fileUrl: string): Promise<void>;
  getObject(fileName: string): Promise<string>;
}
