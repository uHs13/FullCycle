import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../../infrastructure/customer/repository/sequelize/customer.model";
import UuidGenerator from "../../../../infrastructure/uuid/uuid.generator";
import CustomerRepository from "../../../../infrastructure/customer/repository/sequelize/customer.repository";
import CreateCustomerUseCase from "../create/create.customer.usecase";
import UpdateCustomerUseCase from "./update.customer.usecase";
import FindCustomerUseCase from "../find/find.customer.usecase";

describe('Update customer use case integration tests', () => {
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

    it('Should properly update a customer', async () => {
        const name = 'John Cena';
        const street = 'street';
        const number = 13;
        const zipCode = '1313';
        const city = 'city';

        const createInput = {
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

        const createdOutput = await createCustomerUseCase.execute(createInput);

        const useCase = new UpdateCustomerUseCase(customerRepository);

        const updatedName = 'John Cena Two'

        const updateInput = {
            id: createdOutput.id,
            name: updatedName,
            address: {
                street: createdOutput.address.street,
                number: createdOutput.address.number,
                zipCode: createdOutput.address.zipCode,
                city: createdOutput.address.city,
            },
        };

        const output = await useCase.execute(updateInput);

        expect(output).toStrictEqual(updateInput);

        const findCustomerUseCase = new FindCustomerUseCase(customerRepository);

        const foundOutput = await findCustomerUseCase.execute({id: output.id});

        expect(foundOutput).toStrictEqual(updateInput);
    });
});
