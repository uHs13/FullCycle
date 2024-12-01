import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../../infrastructure/customer/repository/sequelize/customer.model";
import UuidGenerator from "../../../../infrastructure/uuid/uuid.generator";
import CustomerRepository from "../../../../infrastructure/customer/repository/sequelize/customer.repository";
import CreateCustomerUseCase from "../create/create.customer.usecase";
import ListCustomerUseCase from "./list.customer.usecase";

describe('List customer use case integration test', () => {
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

    it('Should properly list customer', async () => {
        const name = 'John Cena';
        const street = 'street';
        const number = 13;
        const zipCode = '1313';
        const city = 'city';

        const input = {
            name: name,
            address: {
                street: street,
                number: number,
                zipCode: zipCode,
                city: city,
            },
            uuidGenerator: new UuidGenerator()
        }

        const customerRepository = new CustomerRepository();
        const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

        const createdOutput = await createCustomerUseCase.execute(input);

        const useCase = new ListCustomerUseCase(customerRepository);

        const output = await useCase.execute({});

        const expectedOutput = [
            {
                id: createdOutput.id,
                name: createdOutput.name,
                address: {
                    street: createdOutput.address.street,
                    number: createdOutput.address.number,
                    zipCode: createdOutput.address.zipCode,
                    city: createdOutput.address.city,
                }
            }
        ];

        expect(output).toStrictEqual({customers: expectedOutput});
    });
});
