import {test,expect,Locator,chromium} from '@playwright/test';
import {DataProvider} from '../utils/dataProvider.ts';
import {LoginPage} from '../pages/LoginPage.ts';
import { LogOutPage } from '../pages/LogOutPage.ts';
import {MyAccountPage} from '../pages/MyAccountPage.ts';
import {TestConfig} from '../test.config.ts';
import { HomePage } from '../pages/HomePage.ts';


const jsonFilePath="testdata/logindata.json";
const csvFilePath="testdata/logindata.csv";


const jsonData_:any=DataProvider.getTestDataFromJson(jsonFilePath);
const csvData:any=DataProvider.getTestDataFromCSV(csvFilePath);


/* for(let data of jsonData_)
{
    test(`Verify the Login Functionality for ${data.testName} from Json file`,async()=>
    {
        const browser=await chromium.launch();
        const context=await browser.newContext();
        const page=await context.newPage();

        const config=new TestConfig();
        const login=new LoginPage(page);
        const logout=new LogOutPage(page);
        const account=new MyAccountPage(page);
        const home=new HomePage(page);


        const url=config.appUrl;
        await page.goto(url);
        await page.waitForTimeout(2000);

        await home.clickMyAccountLink();
        await home.clickLoginLink();

        const email_:string=data.email;
        const password_:string=data.password;
        const expected_:string=data.expected;

        await login.loginAction(email_,password_);
        await page.waitForTimeout(2000);

        if(data.expected==='success')
        {
            const status:boolean=await account.myAccountPageExists();
            await expect(status).toBeTruthy();

        }

        else
        {
            const message_=await login.verifyErrorMessage();
            await expect(message_).toContain('Warning: No match for E-Mail Address and/or Password.');
        }

        
        
    })
}
 */




for(let data of csvData)
{
    test(`Verify the Login Functionality for ${data.testName} from Excel file @dataDriven`,async()=>
    {
        const browser=await chromium.launch();
        const context=await browser.newContext();
        const page=await context.newPage();

        const config=new TestConfig();
        const login=new LoginPage(page);
        const logout=new LogOutPage(page);
        const account=new MyAccountPage(page);
        const home=new HomePage(page);


        const url=config.appUrl;
        await page.goto(url);
        await page.waitForTimeout(2000);

        await home.clickMyAccountLink();
        await home.clickLoginLink();

        const email_:string=data.email;
        const password_:string=data.password;
        const expected_:string=data.expected;

        await login.loginAction(email_,password_);
        await page.waitForTimeout(2000);

        if(data.expected==='success')
        {
            const status:boolean=await account.myAccountPageExists();
            await expect(status).toBeTruthy();

        }

        else
        {
            const message_=await login.verifyErrorMessage();
            await expect(message_).toContain('Warning: No match for E-Mail Address and/or Password.');
        }

        
        
    })
}

