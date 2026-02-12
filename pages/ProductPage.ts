import { test, Page, Locator, expect } from '@playwright/test';

import { ShoppingCartPage } from '../pages/ShoppingCartPage';

export class ProductPage {
    private readonly page: Page;

    //Locators//
    private readonly productQuantity: Locator;
    private readonly buttonAddToCart: Locator;
    private readonly confirmationMessage: Locator;
    private readonly viewCartItem_Button: Locator;
    private readonly viewcartItem_Link: Locator;



    constructor(page_: Page) {

        this.page = page_;
        this.productQuantity = this.page.getByRole('textbox', { name: 'Qty' })

        this.buttonAddToCart = this.page.getByRole('button', { name: /Add to Cart/i })

        this.confirmationMessage = this.page.locator('div.alert.alert-success.alert-dismissible')

        this.viewCartItem_Button = this.page.locator("#cart-total");

        this.viewcartItem_Link = this.page.getByText('View Cart', { exact: true });
    }




    //actions methods//

    async setQuantity(productQuantity_: string) {
        await this.productQuantity.fill('');
        await this.productQuantity.fill(productQuantity_);

    }





    async clickAddToCartButton() {
        await this.buttonAddToCart.click();
    }




    async verifyConfirmationMessage(): Promise<boolean> {
        try {
            const message_: string | null = await this.confirmationMessage.textContent();

            if (message_) {
                console.log('the confirmation message is', message_);
                return true;
            }

            else {
                return false;
            }

        }

        catch (error) {
            console.log(`Error occuured while capturing the confirmation message : ${error}`,);

            return false;

        }
    }







    async clickOnViewCartButton() {
        await this.viewCartItem_Button.click();

    }



    async clickViewCart(): Promise<ShoppingCartPage> {
        await this.viewcartItem_Link.click();
        return new ShoppingCartPage(this.page);
    }


    async addProductToCart_whole(productQuantity_: string): Promise<void> {
        await this.setQuantity(productQuantity_);
        await this.clickAddToCartButton();
        await this.verifyConfirmationMessage();

    }







}