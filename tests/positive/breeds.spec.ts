import {test, expect} from '../../fixtures/dogApi.fixture'

test.describe('Dog API - Breed Management', ()=>{
  test('As a user, I want to retrieve all breeds', async({dogClient})=>{
    const response = await dogClient.GetAllBreeds();
    // Assertions
    expect(response.status()).toBe(200);
    const breeds = await response.json();        
    expect(Array.isArray(breeds)).toBeTruthy();
    expect(breeds.length).toBeGreaterThan(0);
    const firstBreed = breeds[0];
    expect(firstBreed).toHaveProperty('id');
    expect(firstBreed).toHaveProperty('name');
  });

  test('As a user, I want to retrieve a random list of 10 images', async({dogClient})=>{
    const limit = 10;
    const response = await dogClient.getRandomImages(limit);
    // Assertions

    expect(response.status()).toBe(200);
    const images = await response.json();
    expect(images.length, 'API should return at least 1 image').toBeGreaterThan(0);
    expect(images).toHaveLength(limit);
        images.forEach((img: any) => {
            expect(img.url).toContain('https://');
        });
  });
  test('As a user, I want to retrieve a random list of 5 images without api key', async ({ playwright }) => {
    const emptyContext = await playwright.request.newContext({
        baseURL: 'https://api.thedogapi.com/v1/'
    });

    const response = await emptyContext.get('images/search', {
        params: { limit: 5 }
    });
    const data = await response.json();
    
    console.log(`Data length: ${data.length}`);
    await emptyContext.dispose();
});
})