import Address from "../valueObject/address";
import CustomerFactory from "./customer.factory";

describe('Customer Factory Unit Tests', () => {
    it('Should properly create a Customer', () => {
        const customer = CustomerFactory.create('John Cena');

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe('John Cena');
        expect(customer.address).toBeUndefined();
    });

    it('Should properly create a Customer with address', () => {
        const address = new Address('Groove Street', 13, '12345', 'Los Santos');

        const customer = CustomerFactory.createWithAddress('Carl Johnson', address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe('Carl Johnson');
        expect(customer.address).toBeDefined();
        expect(customer.address.street).toBe('Groove Street');
        expect(customer.address.number).toBe(13);
        expect(customer.address.zip).toBe('12345');
        expect(customer.address.city).toBe('Los Santos');
    });
});
