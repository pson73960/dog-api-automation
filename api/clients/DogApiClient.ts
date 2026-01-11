import { APIRequestContext, APIResponse } from "@playwright/test";

export class DogAPICLient{
    constructor(private request: APIRequestContext) {
        this.request = request;
    }

    async GetAllBreeds(): Promise<APIResponse>{
        return await this.request.get('breeds');
    }
    async GetBreedById(breedId: string): Promise<APIResponse>{
        return await this.request.get(`breeds/${breedId}`);
    }
    async uploadImage(fileBuffer: Buffer, fileName: string) {
        return await this.request.post('images/upload', {           
            multipart: {
                file: {
                    name: fileName,
                    mimeType: 'image/jpeg',
                    buffer: fileBuffer,
                },
                sub_id: `user_${Date.now()}` 
            }
        });
    }
    // 4. Delete image
    async deleteImage(imageId: string): Promise<APIResponse> {
        return await this.request.delete(`images/${imageId}`);
    }

    // 5. Get random images with dynamic counter
    async getRandomImages(limit: number = 20): Promise<APIResponse> {
        return await this.request.get('images/search', {
            params: { limit: limit }
        });
    }
    async getImageById(imageId: string): Promise<APIResponse> {
        return await this.request.get(`images/${imageId}`);
    }

    //get list image has uploaded
    async getMyUploadedImages(): Promise<APIResponse> {
        return await this.request.get('images', {
            params: { limit: 50 }
        });
    }
    async getImage(imageId: string) {
        return await this.request.get(`images/${imageId}`);
    }

// 2. Upload with a purposely wrong key to test 401
    async uploadImageWithInvalidKey(fileBuffer: Buffer, fileName: string) {
    return await this.request.post('images/upload', {
        headers: {
            'x-api-key': 'invalid_key_12345',
        },
        multipart: {
            'file': { name: fileName, mimeType: 'image/jpeg', buffer: fileBuffer }
        }
    });
    }
}