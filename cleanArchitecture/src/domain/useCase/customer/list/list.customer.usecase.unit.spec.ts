import UuidGenerator from "../../../../infrastructure/uuid/uuid.generator";
import Customer from "../../../customer/entity/customer";
import Address from "../../../customer/valueObject/address";
import ListCustomerUseCase from "./list.customer.usecase";

describe('List customers use case unit tests', () => {
    const addressOne = new Address('street', 13, '1313', 'city');

    const customerOne = new Customer((new UuidGenerator()).generate(), 'John Cena');
    customerOne.address = addressOne;

    const addressTwo = new Address('street two', 13, '1313', 'city two');

    const customerTwo = new Customer((new UuidGenerator()).generate(), 'Carl Johnson');
    customerTwo.address = addressTwo;

    const mockCustomerRepository = () => {
        return {
            create: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn().mockReturnValue(Promise.resolve([customerOne, customerTwo]))
        }
    }

    it('Should properly list customers', async () => {
        const customerRepository = mockCustomerRepository();
        const useCase = new ListCustomerUseCase(customerRepository);

        const output = await useCase.execute({});

        const expectedOutput = [
            {
                id: customerOne.id,
                name: customerOne.name,
                address: {
                    street: customerOne.address.street,
                    number: customerOne.address.number,
                    zipCode: customerOne.address.zip,
                    city: customerOne.address.city,
                }
            },
            {
                id: customerTwo.id,
                name: customerTwo.name,
                address: {
                    street: customerTwo.address.street,
                    number: customerTwo.address.number,
                    zipCode: customerTwo.address.zip,
                    city: customerTwo.address.city,
                }
            }
        ];

        expect(output).toStrictEqual({customers: expectedOutput});
    });
});
