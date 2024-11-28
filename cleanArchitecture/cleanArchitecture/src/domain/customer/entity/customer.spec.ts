import Address from "../valueObject/address";
import Customer from "./customer";

describe('Customer unit tests', () => {
    it('should throw an exception when try to initialize with empty id', () => {
        expect(() => {
            new Customer('', 'John Cena');
        }).toThrow('Id is required');
    });

    it('should throw an exception when try to initialize with empty name', () => {
        expect(() => {
            new Customer('uuid', '');
        }).toThrow('Name is required');
    });

    it('should throw an exception when try to change to empty name', () => {
        expect(() => {
            (new Customer('uuid', 'John Cena')).changeName('');
        }).toThrow('Name is required');
    });

    it('should properly change name', () => {
        expect(() => {
            const newName = 'Carl Johnson';

            let customer = new Customer('uuid', 'John Cena');
            customer.changeName(newName);

            expect(customer.name).toBe(newName);
        });
    });

    it('should throw an exception when try to activate the customer without address', () => {
        expect(() => {
            (new Customer('uuid', 'John Cena')).activate();
        }).toThrow('To activate the customer you must inform an address');
    });

    it('should properly activate the customer', () => {
        expect(() => {
            const address = new Address('Groove Street', 13, '123456789', 'Los Santos');

            let customer = new Customer('uuid', 'Carl Johnson');
            customer.address = address;
            customer.activate();

            expect(customer.isActive()).toBeTruthy();
        });
    });

    it('should properly deactivate the customer', () => {
        expect(() => {
            let customer = new Customer('uuid', 'John Cena');
            customer.deactivate();

            expect(customer.isActive()).toBeFalsy();
        });
    });
});
