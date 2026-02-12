import { test, expect, Locator, Page } from '@playwright/test';
import { LogOutPage } from './LogOutPage';


export class MyAccountPage {
    private readonly page: Page;
    private readonly myAccountHeading: Locator;
    private readonly logoutLink: Locator;



    //constructor
    constructor(page_: Page) {
        this.page = page_;
        this.myAccountHeading = this.page.locator("h2:nth-child(1)");
        this.logoutLink = this.page.locator('a').filter({ hasText: 'Logout' }).last();
    }



    //action methods
//verify if myaccount page exists//
    async myAccountPageExists() {
        try {
            const status: boolean = await this.myAccountHeading.isVisible();
            return true;

        }
        catch (error) {
            console.log(`error occurred while checking My account visibility: ${error}`);
            return false

        }

    }



    //click on the logout Button//
    async clickLogOutLink():Promise<LogOutPage>
    {
        try
        {
            await this.logoutLink.click();
            return new LogOutPage(this.page)
        }
        catch(error)
        {
            console.log(`Error occurred while clicking on Logout Link: ${error}`);
            throw error;
        }
    }




    async getPageTitle():Promise<string>
    {
        const title_=await this.page.title();
        return title_;
    }

}