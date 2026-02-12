import {Page,expect,Locator} from '@playwright/test';

export class RegistrationPage
{
    //variables
    private readonly page:Page;
    private readonly firstName:Locator;
    private readonly lastName:Locator;
    private readonly emailAddress:Locator;
    private readonly telephoneNumber:Locator;
    private readonly password:Locator;
    private readonly confirmPassword:Locator;
    private readonly privacyPolicy:Locator;
    private readonly continueButton:Locator;
    private readonly confirmationMessage:Locator;


    //constructor
    constructor(page_:Page)
    {
        this.page=page_;

        this.firstName=this.page.locator("#input-firstname");

        this.lastName=this.page.locator("#input-lastname");

        this.emailAddress=this.page.locator("#input-email");

        this.telephoneNumber=this.page.locator("#input-telephone");

        this.password=this.page.locator("#input-password");

        this.confirmPassword=this.page.locator("#input-confirm");

        this.privacyPolicy=this.page.locator("input[value='1'][name='agree']");

        this.continueButton=this.page.locator("input[value='Continue']");

        this.confirmationMessage=this.page.locator("div[id='content'] h1");

    }


    //action methods

    async setFirstName(firstname1:string):Promise<void>
    {
        await  this.firstName.fill(firstname1)
    }



    async setLastname(lastname1:string):Promise<void>
{
    await this.lastName.fill(lastname1)

}


async setEmail(email1:string):Promise<void>
{
    await  this.emailAddress.fill(email1);
}


async setTelephoneNumber(number1:string):Promise<void>
{
    await  this.telephoneNumber.fill(number1);
}



async setPassword(password1:string):Promise<void>
{
    await this.password.fill(password1);
}


async setConfirmPassword(password1:string):Promise<void>
{
    await this.confirmPassword.fill(password1)
}


async clickPrivacyPolicy():Promise<void>
{
    await  this.privacyPolicy.click();
}


async clickContinueButton():Promise<void>
{
    await this.continueButton.click();
}




async verifyConfirmationMessage():Promise<string|null>
{
    const message_:string|null=await  this.confirmationMessage.textContent();
    return message_;
}



//complete Registration workflow//
async completeRegistartion(userData:
    {
        firstName:string;
        lastName:string;
        email:string;
        telephone:string;
        password:string;
        
    }
):Promise<void>
{
    await this.setFirstName(userData.firstName);
    await this.setLastname(userData.lastName);
    await this.setEmail(userData.email);
    await this.setTelephoneNumber(userData.telephone);
    await this.setPassword(userData.password);
    await this.setConfirmPassword(userData.password);
    await this.clickPrivacyPolicy();
    await this.clickContinueButton();

   const confirmation_message:string|null= await this.verifyConfirmationMessage();
   if(confirmation_message)
   {
    await expect(confirmation_message).toBe('Your Account Has Been Created!');
    
   }


}



}