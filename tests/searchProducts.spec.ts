/*
Test Case: Product Search
Tags: @master @regression

Steps:
1.Navigate to the application URL
2.Enter the product name in the search field.
3.Click the search button
4. Verify if the product is displayed in the search results.


*/

import {test,expect, chromium,Page} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage} from '../pages/SearchResultspage';
import { TestConfig } from '../test.config';


//Declare reusable variables
let config:TestConfig;
let home:HomePage;
let search:SearchResultsPage;
let page:Page;


//Playwright hook- runs before each test
test.beforeEach('Open the application',async()=>
{
    const browser= await chromium.launch();
    const context=await browser.newContext();
    page=await context.newPage();

    config=new TestConfig();
    home=new HomePage(page);
    search=new SearchResultsPage(page);

    const url=config.appUrl;
    await page.goto(url);
})

test.afterEach('Close the Application',async()=>
{
    await page.close();
})



test('Search if the product is displayed on the screen @mater @regression',async()=>
{
    const productname_=config.productName;
    await home.enterProductName(productname_);

    await home.clickSearchButton();
    await page.waitForTimeout(3000);

    const serachResultspage_status=await search.isResultsPageExists();
    await expect(serachResultspage_status).toBeTruthy();

    const productExists_status=await search.isProductExists(productname_);
    await expect(productExists_status).toBeTruthy();

    const productCount:number=await search.productCount();
    console.log('the number of products are:',productCount);


})