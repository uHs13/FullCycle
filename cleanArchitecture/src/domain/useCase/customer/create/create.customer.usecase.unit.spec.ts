import UuidGenerator from "../../../../infrastructure/uuid/uuid.generator";
import CreateCustomerUseCase from "./create.customer.usecase";

describe('Create customer use case unit tests', () => {
    const name = 'John Cena';
    const street = 'Street';
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
        uuidGenerator: new UuidGenerator(),
    };

    const MockCustomerRepository = () => {
        return {
            create: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn(),
        };
    };

    it('Should properly create a customer', async () => {
        const customerRepository = MockCustomerRepository();
        const useCase = new CreateCustomerUseCase(customerRepository);

        const output = await useCase.execute(input);

        const expectedOutput = {
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zipCode: input.address.zipCode,
                city: input.address.city,
            }
        }

        expect(output).toStrictEqual(expectedOutput);
    });

    it('Should throw an error when customer name is not valid', async () => {
        const errorMessage = 'Name is required';
        expect(async () => {
            const customerRepository = MockCustomerRepository();
            const useCase = new CreateCustomerUseCase(customerRepository);

            input.name = '';
            await useCase.execute(input);
        }).rejects.toThrow(errorMessage);
    });

    it('Should throw an error when customer address street is empty', async () => {
        const errorMessage = 'Street is required';
        expect(async () => {
            const customerRepository = MockCustomerRepository();
            const useCase = new CreateCustomerUseCase(customerRepository);

            const input = {
                name: name,
                address: {
                    street: '',
                    number: number,
                    zipCode: zipCode,
                    city: city,
                },
                uuidGenerator: new UuidGenerator(),
            };

            await useCase.execute(input);
        }).rejects.toThrow(errorMessage);
    });

    it('Should throw an error when customer address number is zero', async () => {
        const errorMessage = 'Number is required';
        expect(async () => {
            const customerRepository = MockCustomerRepository();
            const useCase = new CreateCustomerUseCase(customerRepository);

            const input = {
                name: name,
                address: {
                    street: street,
                    number: 0,
                    zipCode: zipCode,
                    city: city,
                },
                uuidGenerator: new UuidGenerator(),
            };

            await useCase.execute(input);
        }).rejects.toThrow(errorMessage);
    });

    it('Should throw an error when customer address zip code is empty', async () => {
        const errorMessage = 'Zip code is required';
        expect(async () => {
            const customerRepository = MockCustomerRepository();
            const useCase = new CreateCustomerUseCase(customerRepository);

            const input = {
                name: name,
                address: {
                    street: street,
                    number: number,
                    zipCode: '',
                    city: city,
                },
                uuidGenerator: new UuidGenerator(),
            };

            await useCase.execute(input);
        }).rejects.toThrow(errorMessage);
    });

    it('Should throw an error when customer address city is empty', async () => {
        const errorMessage = 'City is required';
        expect(async () => {
            const customerRepository = MockCustomerRepository();
            const useCase = new CreateCustomerUseCase(customerRepository);

            const input = {
                name: name,
                address: {
                    street: street,
                    number: number,
                    zipCode: zipCode,
                    city: '',
                },
                uuidGenerator: new UuidGenerator(),
            };

            await useCase.execute(input);
        }).rejects.toThrow(errorMessage);
    });
});
