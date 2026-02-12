import {Page,Locator} from '@playwright/test';
import {CheckoutPage} from '../pages/CheckoutPage';


export class ShoppingCartPage
{
    private readonly page:Page;
    private readonly totalPrice:Locator;
    private readonly checkoutButton:Locator;



    //constructor//
    constructor(page_:Page)
    {
        this.page=page_;

        // this.totalPrice=this.page.locator('tr').locator('td').nth(1);
        this.totalPrice=this.page.locator('tbody tr td:nth-child(6)');
        
        this.checkoutButton=this.page.locator('a.btn.btn-primary');
    }



    //action methods//

    async getTotalPrice():Promise<string|null>
    {
        try
        {
            const price_=await  this.totalPrice.textContent();

            return price_;
        }
        catch(error)
        {
            console.log(`Error occurred while capturing the price: ${error}`);

            return null;
        }
    }





    async clickOnCheckOutButton():Promise<CheckoutPage>
    {
        await this.checkoutButton.click();
        return new CheckoutPage(this.page);
    }





    async isPageLoaded():Promise<boolean>
    {
        try{
            const status= await this.checkoutButton.isVisible();

            return status
        }
        catch(error)
        {
            return false;
        }
    }

}