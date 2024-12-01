import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../../infrastructure/customer/repository/sequelize/customer.model";
import UuidGenerator from "../../../../infrastructure/uuid/uuid.generator";
import CustomerRepository from "../../../../infrastructure/customer/repository/sequelize/customer.repository";
import CreateCustomerUseCase from "./create.customer.usecase";
import FindCustomerUseCase from "../find/find.customer.usecase";

describe('Create customer use case integration tests', () => {
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

        const expectedOutput = {
            id: expect.any(String),
            name: name,
            address: {
                street: street,
                number: number,
                zipCode: zipCode,
                city: city,
            },
        }

        const customerRepository = new CustomerRepository();
        const useCase = new CreateCustomerUseCase(customerRepository);

        const output = await useCase.execute(input);

        expect(output).toStrictEqual(expectedOutput);

        const findCustomerUseCase = new FindCustomerUseCase(customerRepository);

        const foundCustomer = await findCustomerUseCase.execute({id: output.id});

        const expectedFoundOutput = {
            id: output.id,
            name: name,
            address: {
                street: street,
                number: number,
                zipCode: zipCode,
                city: city,
            },
        }

        expect(foundCustomer).toStrictEqual(expectedFoundOutput);
    });
});
