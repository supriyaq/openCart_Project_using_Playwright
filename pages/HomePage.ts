import { Page, expect, Locator } from '@playwright/test';

export class HomePage {
    //Locators
    private readonly page: Page;
    private readonly myAccountLink: Locator;
    private readonly loginLink: Locator;
    private readonly registerLink: Locator;
    private readonly searchBox: Locator;
    private readonly searchButton: Locator;

    //constructor
    constructor(page_: Page) {
        this.page = page_;

        this.myAccountLink = this.page.locator("a[title='My Account'] span[class='hidden-xs hidden-sm hidden-md']");

        this.loginLink = this.page.locator("a[href='https://tutorialsninja.com/demo/index.php?route=account/login']");

        this.registerLink = this.page.locator("a[href='https://tutorialsninja.com/demo/index.php?route=account/register']");

        this.searchBox = this.page.locator("input[placeholder='Search']");

        this.searchButton = this.page.locator("button[class='btn btn-default btn-lg']");
    }


    //action methods

    async homePageExists(): Promise<boolean> {
        const title1 = await this.page.title();
        if (title1.includes('Your Store')) {

            return true;
        }
        else {
            return false
        }
    }




    async clickMyAccountLink() {
        try {
            await this.myAccountLink.click();

        }
        catch (error) {
            console.log(`Exception occurred while clicking on My Account ${error}`);
            throw error;

        }
    }




    async clickRegisterLink() {
        try {
            await this.registerLink.click()

        }
        catch (error) {
            console.log(`Exception occurred while clicking on Register Link ${error}`);
            throw error;

        }
    }




    async clickLoginLink() {
        try {
            await this.loginLink.click();

        }
        catch (error) {
            console.log(`Exception occurred while clicking on Login Link ${error}`);
            throw error
        }
    }





    //Enter product name in the search Box//
    async enterProductName(productName_: string) {
        try {
            await this.searchBox.fill(productName_);
        }
        catch (error) {
            console.log(`Exception occurred while entering the product name: ${error}`);
            throw error
        }
    }






    //click on the search Button//
    async clickSearchButton() {
        try {
            await this.searchButton.click()

        }
        catch (error) {
            console.log(`Exception occurred while clicking on Search Button: ${error}`);
            throw error;
        }
    }
















}