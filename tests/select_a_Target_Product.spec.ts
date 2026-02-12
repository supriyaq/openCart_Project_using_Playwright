/*
Test Case: Add Product To cart
Tags: @master @regression

Steps:
1.Navigate to application URL
2.Enter an existing product name in the search Box
3.Click the search button
4.Verify the product appears in the serach results
5.Select the product
6.Set Quantity
7.Add the Product to the Cart
8.Verify the sucess Message
*/



import { Page, expect, test, Locator, chromium } from '@playwright/test';

import { HomePage } from '../pages/HomePage';
import { LogOutPage } from '../pages/LogOutPage';
import { LoginPage } from '../pages/LoginPage';
import { SearchResultsPage } from '../pages/SearchResultspage';
import { ProductPage } from '../pages/ProductPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { TestConfig } from '../test.config';



let page: Page;
let home: HomePage;
let logout: LogOutPage;
let login: LoginPage;
let search: SearchResultsPage;
let product: ProductPage;
let account: MyAccountPage;
let shopping: ShoppingCartPage;
let config: TestConfig;



//shared instances//
test.beforeEach('Open the Application ', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    page = await context.newPage();

    config = new TestConfig();
    home = new HomePage(page);
    logout = new LogOutPage(page);
    login = new LoginPage(page);
    search = new SearchResultsPage(page);
    product = new ProductPage(page);
    account = new MyAccountPage(page);
    shopping = new ShoppingCartPage(page);

    const url = config.appUrl;
    await page.goto(url);
})


test.afterEach('Close the Application', async () => {
    await page.close();
})




test('Add Product To cart @master @regression', async () => {

    const productQuantity_ = config.productQuantity;

    const productname_: string = config.productName;

    await home.enterProductName(productname_);
    await home.clickSearchButton();

    const searchResultsPage_status: boolean = await search.isResultsPageExists();
    await expect(searchResultsPage_status).toBeTruthy();

    const productExists_status: boolean = await search.isProductExists(productname_);
    await expect(productExists_status).toBeTruthy();

    if (productExists_status) {
        await search.selectTargetProduct(productname_);
        await product.setQuantity(productQuantity_);

        await page.waitForTimeout(2000);
        await product.clickAddToCartButton();
        // await page.waitForTimeout(2000);

        const messageStatus_:boolean=await product.verifyConfirmationMessage();
        await expect(messageStatus_).toBeTruthy();

        console.log('Product sucessfully added to cart !!!');




    }


})
