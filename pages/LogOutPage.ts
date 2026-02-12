import { Page, expect, Locator } from '@playwright/test';
import { error } from 'node:console';
import { HomePage } from './HomePage';

export class LogOutPage {
    private readonly page: Page;
    private readonly logoutHeading: Locator;
    private readonly continueButton: Locator;

    //constructor//
    constructor(page_: Page) {
        this.page = page_;
        this.continueButton = this.page.getByRole('link', { name: 'Continue' });
        this.logoutHeading = this.page.getByRole('heading', { name: 'Account Logout' });
    }




    //action methods//
    async isLogoutHeadingVisible(): Promise<boolean> {
        try {
            const status: boolean = await this.logoutHeading.isVisible();
            return status;

        }
        catch(error) {
            console.log(`Error occurred while capturing the heading: ${error}`);
            return false;

        }
    }



    async isContinueButtonVisible(): Promise<boolean> {
        const status: boolean = await this.continueButton.isVisible();
        return status;
    }


    async clickContinueButton(): Promise<HomePage> {
        try {
            await this.continueButton.click();
            return new HomePage(this.page);

        }
        catch (error) {
            console.log(`Error occurred while clicking on the continue buuton: ${error}`);
            throw error;

        }
    }




}