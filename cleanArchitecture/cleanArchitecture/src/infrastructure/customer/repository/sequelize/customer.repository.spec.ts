import { Sequelize } from "sequelize-typescript";

import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/valueObject/address";

describe('Customer repository test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        });

        await sequelize.addModels([CustomerModel]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should properly create a customer', async () => {
        const uuid = 'uuid';
        const name = 'John Cena';
        const street = 'street';
        const number = 13;
        const zip = 'zip';
        const city = 'city';

        const customerRepository = new CustomerRepository();
        const address = new Address(street, number, zip, city);
        const customer = new Customer(uuid, name);
        customer.address = address;
        customer.activate();

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({where: {id: uuid}});

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            street: customer.address.street,
            number: customer.address.number,
            zip: customer.address.zip,
            city: customer.address.city,
        });
    });

    it('should properly update a customer', async () => {
        const uuid = 'uuid';
        const name = 'John Cena';
        const street = 'street';
        const number = 13;
        const zip = 'zip';
        const city = 'city';

        const customerRepository = new CustomerRepository();
        const address = new Address(street, number, zip, city);
        const customer = new Customer(uuid, name);
        customer.address = address;
        customer.activate();

        await customerRepository.create(customer);

        const updatedName = 'John Updated Name';

        customer.changeName(updatedName);

        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({where: {id: uuid}});

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: updatedName,
            active: customer.isActive(),
            street: customer.address.street,
            number: customer.address.number,
            zip: customer.address.zip,
            city: customer.address.city,
        });
    });

    it('should properly find a customer', async () => {
        const uuid = 'uuid';
        const name = 'John Cena';
        const street = 'street';
        const number = 13;
        const zip = 'zip';
        const city = 'city';

        const customerRepository = new CustomerRepository();
        const address = new Address(street, number, zip, city);
        const customer = new Customer(uuid, name);
        customer.address = address;
        customer.activate();

        await customerRepository.create(customer);

        const foundCustomerModel = await customerRepository.find(customer.id);

        expect(foundCustomerModel).toStrictEqual(customer);
    });

    it('should throw an error when customer is not found', async () => {
        expect(async () => {
            const customerRepository = new CustomerRepository();

            await customerRepository.find('not-existent-id');
        }).rejects.toThrow('Customer not found');
    });

    it('should properly find all customers', async () => {
        const uuid = 'uuid';
        const uuidTwo = 'uuidTwo';
        const name = 'John Cena';
        const street = 'street';
        const number = 13;
        const zip = 'zip';
        const city = 'city';

        const address = new Address(street, number, zip, city);
        const customer = new Customer(uuid, name);
        customer.address = address;
        customer.activate();

        const customerTwo = new Customer(uuidTwo, name);
        customerTwo.address = address;
        customerTwo.activate();

        const customerRepository = new CustomerRepository();
        await customerRepository.create(customer);
        await customerRepository.create(customerTwo);

        const foundCustomerModels = await customerRepository.findAll();

        expect(foundCustomerModels).toHaveLength(2);
        expect(foundCustomerModels).toEqual([customer, customerTwo]);
    });
});
