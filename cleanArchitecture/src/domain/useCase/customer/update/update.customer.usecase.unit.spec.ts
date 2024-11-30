import UuidGenerator from "../../../../infrastructure/uuid/uuid.generator";
import Customer from "../../../customer/entity/customer";
import Address from "../../../customer/valueObject/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

describe('Update customer use case unit tests', () => {
    const name = 'John Cena Two';
    const street = 'street two';
    const number = 13;
    const zipCode = '1313';
    const city = 'city two';

    const address = new Address('street', 13, '1313', 'city');

    const customer = new Customer((new UuidGenerator()).generate(), 'John Cena');
    customer.address = address;

    const input = {
        id: customer.id,
        name: name,
        address: {
            street: street,
            number: number,
            zipCode: zipCode,
            city: city,
        }
    };

    const MockCustomerRepository = () => {
        return {
            create: jest.fn(),
            update: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(customer)),
            findAll: jest.fn(),
        };
    };

    it('Should properly update a customer', async () => {
        const customerRepository = MockCustomerRepository();
        const useCase = new UpdateCustomerUseCase(customerRepository);

        const output = await useCase.execute(input);

        expect(output).toStrictEqual(input);
    });

    it('Should throw an error when customer was not found', () => {
        const errorMessage = 'Customer not found';

        expect(async () => {
            const MockCustomerRepository = () => {
                return {
                    create: jest.fn(),
                    update: jest.fn(),
                    find: jest.fn().mockRejectedValue(new Error(errorMessage)),
                    findAll: jest.fn(),
                };
            };

            const customerRepository = MockCustomerRepository();
            const useCase = new UpdateCustomerUseCase(customerRepository);

            await useCase.execute(input);
        }).rejects.toThrow(errorMessage);
    });

    it('Should throw an error when customer name is not valid', async () => {
        const errorMessage = 'Name is required';
        expect(async () => {
            const customerRepository = MockCustomerRepository();
            const useCase = new UpdateCustomerUseCase(customerRepository);

            const input = {
                id: customer.id,
                name: '',
                address: {
                    street: street,
                    number: number,
                    zipCode: zipCode,
                    city: city,
                }
            };

            await useCase.execute(input);
        }).rejects.toThrow(errorMessage);
    });

    it('Should throw an error when customer address street is empty', async () => {
        const errorMessage = 'Street is required';
        expect(async () => {
            const customerRepository = MockCustomerRepository();
            const useCase = new UpdateCustomerUseCase(customerRepository);

            const input = {
                id: customer.id,
                name: 'John Cena Two',
                address: {
                    street: '',
                    number: number,
                    zipCode: zipCode,
                    city: city,
                }
            };

            await useCase.execute(input);
        }).rejects.toThrow(errorMessage);
    });

    it('Should throw an error when customer address number is zero', async () => {
        const errorMessage = 'Number is required';
        expect(async () => {
            const customerRepository = MockCustomerRepository();
            const useCase = new UpdateCustomerUseCase(customerRepository);

            const input = {
                id: customer.id,
                name: name,
                address: {
                    street: street,
                    number: 0,
                    zipCode: zipCode,
                    city: city,
                }
            };

            await useCase.execute(input);
        }).rejects.toThrow(errorMessage);
    });

    it('Should throw an error when customer address zip code is empty', async () => {
        const errorMessage = 'Zip code is required';
        expect(async () => {
            const customerRepository = MockCustomerRepository();
            const useCase = new UpdateCustomerUseCase(customerRepository);

            const input = {
                id: customer.id,
                name: name,
                address: {
                    street: street,
                    number: number,
                    zipCode: '',
                    city: city,
                }
            };

            await useCase.execute(input);
        }).rejects.toThrow(errorMessage);
    });

    it('Should throw an error when customer address city is empty', async () => {
        const errorMessage = 'City is required';
        expect(async () => {
            const customerRepository = MockCustomerRepository();
            const useCase = new UpdateCustomerUseCase(customerRepository);

            const input = {
                id: customer.id,
                name: name,
                address: {
                    street: street,
                    number: number,
                    zipCode: zipCode,
                    city: '',
                }
            };

            await useCase.execute(input);
        }).rejects.toThrow(errorMessage);
    });
});
