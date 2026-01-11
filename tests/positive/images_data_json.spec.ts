import { test, expect } from '../../fixtures/dogApi.fixture';
import { FileUtils } from '../../utils/fileUtils';
import testData from '../../data/imageTestData.json';

test.describe('Dog API - Data Driven with JSON', () => {
    
    for (const data of testData) {
        test(`Verify upload for ${data.description}`, async ({ dogClient, page }) => {
            
            const fileBuffer = FileUtils.getFileBuffer(data.fileName);
            
            const response = await dogClient.uploadImage(fileBuffer, data.fileName);
            expect(response.status()).toBe(201);
            
            const responseBody = await response.json();
            const imageId = responseBody.id;

            // Kiểm tra hiển thị trên UI
            await page.goto(responseBody.url);
            const isImageVisible = await page.evaluate(() => {
                const img = document.querySelector('img');
                return img && img.complete && img.naturalWidth > 0;
            });
            expect(isImageVisible, `Image ${data.fileName} should be visible`).toBeTruthy();

            await dogClient.deleteImage(imageId);
        });
    }
});