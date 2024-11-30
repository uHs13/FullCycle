import Address from "../../../customer/valueObject/address";
import Customer from "../../../customer/entity/customer";
import FindCustomerUseCase from "./find.customer.usecase";

const uuid = 'uuidUseCase';
const name = 'John Cena';
const street = 'street';
const number = 13;
const zipCode = 'zipCode';
const city = 'city';

const address = new Address(street, number, zipCode, city);
const customer = new Customer(uuid, name);

customer.address = address;
customer.activate();

const mockCustomerRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
    };
}

describe('Find customer use case unit tests', () => {
    it('Should properly find a customer', async () => {
        const customerRepository = mockCustomerRepository();
        const useCase = new FindCustomerUseCase(customerRepository);

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

    it('Should throw an error when customer was not found', async () => {
        const customerRepository = mockCustomerRepository();
        const useCase = new FindCustomerUseCase(customerRepository);

        const errorMessage = 'Customer not found'

        customerRepository.find.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const input = {
            id: uuid
        };

        expect(() => {
            return useCase.execute(input)
        }).rejects.toThrow(errorMessage)
    });
});
