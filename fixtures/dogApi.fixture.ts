import { DogAPICLient } from "../api/clients/DogApiClient";
import { test as base } from '@playwright/test';

type dogAPI = {
    dogClient: DogAPICLient;
}

export const test = base.extend<dogAPI>({
    dogClient: async({ request },use)=>{
        await use(new DogAPICLient(request));
    }
});
export { expect } from '@playwright/test';
