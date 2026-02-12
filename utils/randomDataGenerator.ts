import { faker } from "@faker-js/faker";

export class  RandomDataUtil
{

    static getFirstName()
    {
       const firstName_= faker.person.firstName();
        return firstName_;
    }


    static getLastName()
    {
        const lastName_=faker.person.lastName();
        return lastName_;
    }



    static getEmail()
    {
        const email_=faker.internet.email();
        return email_;
    }



    static getNumber()
    {
        const number_=faker.phone.number();
        return number_
    }


    static getUserName():string{
       const username_= faker.internet.username();
       return username_;
    }


    static getPassword():string
    {
        const password_=faker.internet.password();
        return password_;
    }


    static getRandomCountry():string
    {
        const country_=faker.location.country();
        return country_;
    }


    static getRandomState():string
    {
        const state_=faker.location.state();
        return state_;
    }



    static getRandomCity():string
    {
        const city_=faker.location.city();
        return city_;
    }


    static getRandomZipcode():string
    {
        const zipcode_=faker.location.zipCode();
        return zipcode_;
    }


    static getRandomAddress():string{
        const streetAddress_= faker.location.streetAddress();
        return streetAddress_;
    }


    static getRandomPassword(length:number=10):string{
        const randomPassword_=faker.internet.password({length});
        return randomPassword_;
    }



    static getRandomAlphanumeric(length:number):string
    {
        return faker.string.alphanumeric(length);
    }



    static getRandomnumeric(length:number):string
    {
        return faker.string.numeric(length);
    }


    static getRandomUUID():string{
        const uuid_=faker.string.uuid();
        return uuid_;
    }




}