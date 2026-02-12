/*
Test case: Login with valid credentials

Tags: @master @sanity @regression

Steps:
1.NAvigate to the application URL
2.Navigate to  the Login page via Home Page
3.Enter valid credentials and LogIn
4.Verify sucessfull login by checking 'MyAccount' page presence
5.

*/



import { test, expect, Page, Locator, chromium } from '@playwright/test';

import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { LogOutPage } from '../pages/LogOutPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { TestConfig } from '../test.config';

let config: TestConfig;
let home: HomePage;
let login: LoginPage;
let account: MyAccountPage;
let page: Page;
let logout:LogOutPage;


//Before Hook//
test.beforeEach('Open the application', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    page = await context.newPage();

    config = new TestConfig();
    home = new HomePage(page);
    login = new LoginPage(page);
    account = new MyAccountPage(page);
    

    const url = config.appUrl;
    await page.goto(url);
    await page.waitForTimeout(2000);




})



test.afterEach('Close the application',async()=>
{
    await page.close();
})


test('LoginInto the application and Logout @master @sanity @regression',async()=>
{
    await home.clickMyAccountLink();
    await home.clickLoginLink();
    await page.waitForTimeout(2000);


    const email_=config.email;
    const password_=config.password;


    await login.loginAction(email_,password_);
    await page.waitForTimeout(2000);

   const myAccount_Status:boolean= await account.myAccountPageExists();
   await expect(MyAccountPage).toBeTruthy();

   const myAccountTitle:string|null=await account.getPageTitle();
   console.log('The title is :',myAccountTitle);

   logout=await account.clickLogOutLink();
   await page.waitForTimeout(2000);

 const logout_status=  await logout.isLogoutHeadingVisible();
 await expect(logout_status).toBeTruthy();


 const continueButtonVisible:boolean=await logout.isContinueButtonVisible();
 await expect(continueButtonVisible).toBeTruthy();

  home=await logout.clickContinueButton();
  await page.waitForTimeout(2000);
 const homePage_status= await home.homePageExists();
  await expect(homePage_status).toBeTruthy();



})
