import {test,Page,Locator} from '@playwright/test';
import { UrlWithStringQuery } from 'url';

export class LoginPage
{
    private readonly page:Page;
    private readonly emailAddress_:Locator;
    private readonly password_:Locator;
    private readonly loginButton_:Locator;
    private readonly errorMessage_:Locator;



    constructor(page_:Page)
    {
        this.page=page_;

        this.emailAddress_=this.page.locator("#input-email");

        this.password_=this.page.locator("#input-password");

        this.loginButton_=this.page.locator("input[value='Login']");

        this.errorMessage_=this.page.locator(".alert.alert-danger.alert-dismissible")
    }


    //action methods//
    async enterEmailAddress(email_:string)
    {
        await this.emailAddress_.fill(email_);
    }



    async enterPassword(password_:string)
    {
        await this.password_.fill(password_);
    }


    async clickLoginButton()
    {
        await this.loginButton_.click();

    }

    async verifyErrorMessage():Promise<string|null>
    {
       const Message_:string|null= await this.errorMessage_.textContent();
       return Message_;
    }



    async loginAction(email_:string,password_:string)
    {

        await this.enterEmailAddress(email_);
        await this.enterPassword(password_);
        await this.clickLoginButton();


    }


}