import { Page, Locator } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { error } from 'node:console';

export class SearchResultsPage {
    private readonly page: Page;
    private readonly searchPageHeader: Locator;
    private readonly searchedProducts: Locator;

    //

    constructor(page_: Page) {
        this.page = page_;

        this.searchPageHeader = this.page.getByRole('heading', { name: 'Search - Macbook' });

        this.searchedProducts = this.page.locator("div.row h4 a");

    }

    //action methods//

    async isResultsPageExists(): Promise<boolean> {
        try {
            const header_Status = await this.searchPageHeader.textContent();
            if (header_Status) {
                if (header_Status.includes('Search -')) {
                    return true;
                }

            }
            return false;

        }
        catch (error) {
            console.log(`Error occurred while capturing message ${error}`);
            return false;

        }


    }




    async isProductExists(productname_: string): Promise<boolean> {
        try {
            const allProducts: Locator[] = await this.searchedProducts.all();
            for (let product of allProducts) {
                const ans = await product.textContent();
                if (ans === productname_) {
                    return true;
                }
            }

        }
        catch {
            console.log(`Error occurred while capturing the elements :${error}`)
            throw error;

        }

        return false;

    }






    async selectTargetProduct(productname_: string): Promise<ProductPage | null> {
        try {
            const allProducts: Locator[] = await this.searchedProducts.all();
            for (let product of allProducts) {
                const ans = await product.textContent();
                if (ans === productname_) {
                    await product.click();
                    return new ProductPage(this.page);
                }
            }

        }
        catch {
            console.log(`Error occurred while clicking on the elements :${error}`)
            throw error;

        }

        return null;


    }






    async productCount(): Promise<number> {
        const numberOfProduct: number = await this.searchedProducts.count();

        return numberOfProduct;
    }




}