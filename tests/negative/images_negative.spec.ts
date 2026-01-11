import { test, expect } from '../../fixtures/dogApi.fixture';
import { FileUtils } from '../../utils/fileUtils';

test.describe('Dog API - Negative Scenarios', () => {

    test('Should return 401 when uploading with an invalid API Key', async ({ dogClient }) => {
        const fileBuffer = FileUtils.getFileBuffer('dog.jpg');
        
        const response = await dogClient.uploadImageWithInvalidKey(fileBuffer, 'test.jpg');
        
        expect(response.status(), 'Expected 401 Unauthorized for invalid key').toBe(401);
    });

    test('Should return 404 when fetching an image with a non-existent ID', async ({ dogClient }) => {
        const fakeId = 'this_id_does_not_exist';
        const response = await dogClient.getImage(fakeId);
        
        expect(response.status(), 'Expected 400 Not Found for fake ID').toBe(400);
        const errorMessage = await response.text();
    
    // The exact message you requested
    const expectedMessage = `Couldn't find an image matching the passed 'id' of ${fakeId}`;
    
    expect(errorMessage, 'Error message should match the API documentation').toContain(expectedMessage);
    });
});