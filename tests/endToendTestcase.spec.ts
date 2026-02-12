/*
Test Case: End-To-End Test on Demo E-commerce Application

Purpose:
This test simulates a complete user flow on an e-commerce site.


Steps: 
1.Register a new account
2.Logout after Registration is done
3.Login with the same account
4.Search for a product and add it to the shopping Cart
5.Verify cart contents
6.Attempt checkout (disabled since feature is not available on the demo site)
*/

import {test,expect,Page, chromium} from '@playwright/test';
import {RegistrationPage} from '../pages/RegistrationPage';
import {HomePage} from '../pages/HomePage';
import {RandomDataUtil} from '../utils/randomDataGenerator.ts';
import {TestConfig} from '../test.config.ts';
import {LogOutPage} from '../pages/LogOutPage.ts';
import {LoginPage} from '../pages/LoginPage.ts';
import {MyAccountPage} from '../pages/MyAccountPage.ts';
import {SearchResultsPage} from '../pages/SearchResultspage.ts';
import { ProductPage } from '../pages/ProductPage.ts';
import { ShoppingCartPage } from '../pages/ShoppingCartPage.ts';
import {CheckoutPage} from '../pages/CheckoutPage.ts';
// let page:Page;



test('execute End to End Test cases @endToend',async()=>
{
    const browser=await chromium.launch();
    const context=await browser.newContext();

    const page=await context.newPage();

    const config=new TestConfig;
    const url=config.appUrl;
    await page.goto(url);

   const RegisteredEmailAddress:string= await performRegister(page);
   console.log('The value of registered Email is:',RegisteredEmailAddress);
//    console.log('the value of the Password is :','Secret@12345');


await performLogoutAction(page);
console.log('the user is Logged Out of the Application');

await performLoginAction(page,RegisteredEmailAddress);
console.log('the user is Logged Into the application.')


await addProductToCart(page);
await page.waitForTimeout(2000);
await verifyShoppingCart(page);

})



//function to register a new Account//

async function performRegister(page:Page):Promise<string>
{
    const home=new HomePage(page);
    const register=new RegistrationPage(page);
    
    await home.clickMyAccountLink();
    await home.clickRegisterLink();
    await page.waitForTimeout(2000);

    const email:string=RandomDataUtil.getEmail();

    await register.setFirstName(RandomDataUtil.getFirstName());
    await register.setLastname(RandomDataUtil.getLastName());
    await register.setEmail(email);
    await register.setTelephoneNumber(RandomDataUtil.getNumber());
    await register.setPassword('Secret@12345');
    await register.setConfirmPassword('Secret@12345');
    await register.clickPrivacyPolicy();
    await register.clickContinueButton();

    await page.waitForTimeout(2000);

    return email;



}






//Perform Logout Action//
async function performLogoutAction(page:Page)
{
    let account=new MyAccountPage(page);
    let logout=new LogOutPage(page);

   const myAccountHeading:boolean= await account.myAccountPageExists();
   await expect(myAccountHeading).toBeTruthy();


   const title1:string=await account.getPageTitle();
   console.log('the title is:',title1);

  logout= await account.clickLogOutLink();
 const logoutHeading:boolean= await logout.isLogoutHeadingVisible();
 await expect(logoutHeading).toBeTruthy();

const continueButton:boolean= await logout.isContinueButtonVisible();
await expect(continueButton).toBeTruthy();

const home=await logout.clickContinueButton();
const homePageStatus:boolean=await home.homePageExists();
await expect(homePageStatus).toBeTruthy();
console.log('the user is on Home Page !!!')

}











//function to perform LogIn Action//
async function performLoginAction(page:Page,email:string)
{
    const config=new TestConfig();
    const home=new HomePage(page);
    const login=new LoginPage(page);
    const account=new MyAccountPage(page);

    const url=config.appUrl;
    await page.goto(url);

    await home.clickMyAccountLink();
    await home.clickLoginLink();

    

    await login.loginAction(email,'Secret@12345');
    await page.waitForTimeout(2000);

   const myAccountHeading_status= await account.myAccountPageExists();
   await expect(myAccountHeading_status).toBeTruthy();


}




//Add product To the cart//
async function addProductToCart(page:Page)
{
    const home=new HomePage(page);
    const config=new TestConfig();
    const search=new SearchResultsPage(page)
    const productName1=config.productName;
    const productQuantity1=config.productQuantity;

    await home.enterProductName(productName1);
    await home.clickSearchButton();

    const search_Page_Status:boolean=await search.isResultsPageExists();
    await expect(search_Page_Status).toBeTruthy();

    const productExists_status:boolean=await search.isProductExists(productName1);
    await expect(productExists_status).toBeTruthy();

    if(productExists_status)
    {
 const product=await search.selectTargetProduct(productName1);
await product?.setQuantity(productQuantity1);
await page.waitForTimeout(2000);
await product?.clickAddToCartButton();
const confirmationMessage_=await product?.verifyConfirmationMessage();
await expect(confirmationMessage_).toBeTruthy();

 console.log('Sucess-Product Added to Cart')
 
    }



}








   //verify the shopping Cart//
    async function verifyShoppingCart(page:Page)
    {
        const config=new TestConfig();
        const product=new ProductPage(page);
        
        await product.clickOnViewCartButton();
        await page.waitForTimeout(2000);
      const shopping=  await product.clickViewCart();
   const shoppingCartPage_status:boolean=  await  shopping.isPageLoaded();
   await expect(shoppingCartPage_status).toBeTruthy();


   const price1=config.totalPrice;
   const price2=await shopping.getTotalPrice();
   console.log('the value of price 1 is: ',price1);
   console.log('the value of price 2 is: ',price2);

   await expect(price1).toBe(price2);


    }
  
   