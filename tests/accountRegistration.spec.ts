import {test,expect, Page,chromium} from '@playwright/test';
import {HomePage} from '../pages/HomePage';
import {RegistrationPage} from '../pages/RegistrationPage';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';


/*
Test Case: Account Registration

Tags: @master @sanity @regression

Steps:
1.Navigate to application url
2.Go to 'My Accounts' and click 'Register
3.Fill in the registration details with random data
4.Agree to Privacy Policy and submit the form
5.Validate the confirmation message

*/
let config:TestConfig;
let home:HomePage;
let register:RegistrationPage;
let page:Page;

test.beforeEach('Open the application',async()=>
{
    const browser=await chromium.launch();
    const context=await browser.newContext();
    page=await context.newPage();

    config=new TestConfig();
    home=new HomePage(page);
    register=new RegistrationPage(page);

    const url=config.appUrl;
    await page.goto(url);
    await page.waitForTimeout(2000);

})


test.afterEach('Close the application',async()=>
{
    // await page.waitForTimeout(3000);
    await page.close();
})





test('Account Registration Test @master @sanity @regression',async()=>
{
    await home.clickMyAccountLink();
    await home.clickRegisterLink();
    await page.waitForTimeout(2000);

    await register.setFirstName(RandomDataUtil.getFirstName());
    await register.setLastname(RandomDataUtil.getLastName());

    const email:string=RandomDataUtil.getEmail();
    const password:string=RandomDataUtil.getPassword();

    await register.setEmail(email);
    await register.setTelephoneNumber(RandomDataUtil.getNumber());
    await register.setPassword(password);
    await register.setConfirmPassword(password);
    await register.clickPrivacyPolicy();
    await register.clickContinueButton();

    await page.waitForTimeout(2000);
   const message_:string|null= await register.verifyConfirmationMessage();
   if(message_)
   {
    await expect(message_).toBe('Your Account Has Been Created!')
   }


   console.log('The generated email address is: ',email);
   console.log('The generated password is: ',password)
})