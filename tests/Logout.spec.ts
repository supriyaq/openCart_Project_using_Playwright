 /*
Test Case: User Logout

Tags: @master @regression

Steps:
1.Navigate to the application
2.Go to Login page from Home page
3.Login with valid credentials
4. Verify 'My Account' page
5. Click on Logout link
6. Click on Continue button
7. Verify user is redirected to Home Page
*/

import {test,expect,Page, chromium} from '@playwright/test';
import {TestConfig} from '../test.config.ts';
import { HomePage } from '../pages/HomePage.ts';
import {LoginPage} from '../pages/LoginPage.ts';
import {MyAccountPage} from '../pages/MyAccountPage.ts';
import { LogOutPage } from '../pages/LogOutPage.ts';

//Declare shared variables//
let config:TestConfig;
let home:HomePage;
let login:LoginPage;
let account:MyAccountPage;
let logout:LogOutPage;
let page:Page;

//setup before each Test//
test.beforeEach('Open the application',async()=>
{
const browser=await chromium.launch();
const context=await browser.newContext();
page=await context.newPage();

    config=new TestConfig();
    home=new HomePage(page);
    login=new LoginPage(page);
    logout=new LogOutPage(page);
    account=new MyAccountPage(page);

    const url=config.appUrl;
    await page.goto(url);


})

test.afterEach('Close the Application',async()=>
{
    await page.close();
})




test('Verify the LogOut Functionality  @master @regression',async()=>
{
    await home.clickMyAccountLink();
    await home.clickLoginLink();
    await page.waitForTimeout(2000);

    const email_=config.email;
    const password_=config.password;

    await login.loginAction(email_,password_);

    const myAccountPage_status=await account.myAccountPageExists();
    await expect(myAccountPage_status).toBeTruthy();
    console.log('the user logged In sucessfully');

   logout= await account.clickLogOutLink();
  const continueButton_status= await logout.isContinueButtonVisible();
  const logoutHeading_status=await logout.isLogoutHeadingVisible();

  await expect(continueButton_status).toBeTruthy();
  await expect(logoutHeading_status).toBeTruthy();


  home=await logout.clickContinueButton();
 const homePageStatus:boolean= await home.homePageExists();
 await expect(homePageStatus).toBeTruthy();
 console.log('the user is on the Home Page !!!')





})