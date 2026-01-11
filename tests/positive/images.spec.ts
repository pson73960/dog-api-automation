import { test, expect } from '../../fixtures/dogApi.fixture';
import { FileUtils } from '../../utils/fileUtils';

test.describe('Dog API - Image Management', () => {
    let uploadedImageId: string | undefined;
    test.afterEach(async ({ dogClient }) => {
        if (uploadedImageId) {
            console.log(`--- Cleanup: Deleting image ID ${uploadedImageId} ---`);
            const response = await dogClient.deleteImage(uploadedImageId);
            console.log(`Cleanup status: ${response.status()}`);
            uploadedImageId = undefined;
        }
    });

    test('As a user, I should be able to upload an image and verify it via UI', async ({ dogClient, page }) => {
        const fileBuffer = FileUtils.getFileBuffer('dog.jpg');

        // 2. Upload image via API
        const uploadResponse = await dogClient.uploadImage(fileBuffer, 'test_dog.jpg');
        
        // Error handling for debugging purposes
        if (uploadResponse.status() !== 201) {
            const errorBody = await uploadResponse.text();
            console.error('Upload Failed details:', errorBody);
        }
        
        expect(uploadResponse.status(), 'API should return 201 Created').toBe(201);
        
        const uploadData = await uploadResponse.json();
        uploadedImageId = uploadData.id;
        const imageUrl = uploadData.url;

        console.log(`Step 1: Image uploaded successfully. ID: ${uploadedImageId}`);

        // 3. UI Verification: Check if image is accessible and rendered correctly
        await page.goto(imageUrl);
        
        // Verify image natural width to ensure it's not a broken image icon
        const isImageVisible = await page.evaluate(() => {
            const img = document.querySelector('img');
            return img && img.complete && img.naturalWidth > 0;
        });

        expect(isImageVisible, 'The uploaded image should be visible in the browser').toBeTruthy();
        console.log('Step 2: UI verification passed.');
    });
});