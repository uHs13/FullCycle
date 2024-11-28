import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../../infrastructure/customer/repository/sequelize/customer.repository";
import Address from "../../../customer/valueObject/address";
import Customer from "../../../customer/entity/customer";
import FindCustomerUseCase from "./find.customer.usecase";

describe('Find customer use case integration tests', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'memory',
            logging: false,
            sync: {force: true},
        });

        await sequelize.addModels([CustomerModel]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('Should properly find a customer', async () => {
        const uuid = 'uuidUseCase';
        const name = 'John Cena';
        const street = 'street';
        const number = 13;
        const zipCode = 'zipCode';
        const city = 'city';

        const customerRepository = new CustomerRepository();
        const useCase = new FindCustomerUseCase(customerRepository);
        const address = new Address(street, number, zipCode, city);
        const customer = new Customer(uuid, name);

        customer.address = address;
        customer.activate();

        await customerRepository.create(customer);

        const input = {
            id: uuid
        };

        const expectedOutput = {
            id: uuid,
            name: name,
            address: {
                street: street,
                number: number,
                zipCode: zipCode,
                city: city,
            },
        };

        const output = await useCase.execute(input);

        expect(output).toStrictEqual(expectedOutput);
    });
});
