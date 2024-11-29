import Customer from "../../../customer/entity/customer";
import CustomerRepositoryInterface from "../../../customer/repository/customerRepositoryInterface";
import Address from "../../../customer/valueObject/address";
import { InputCreateCustomerDtoInterface, OutputCreateCustomerDtoInterface } from "./create.customer.dto";

export default class CreateCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    public async execute(input: InputCreateCustomerDtoInterface): Promise<OutputCreateCustomerDtoInterface> {
        try {
            const customer = this.buildCustomer(input);

            await this.customerRepository.create(customer);

            return {
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.address.street,
                    number: customer.address.number,
                    zipCode: customer.address.zip,
                    city: customer.address.city,
                }
            }
        } catch (error) {
            throw error
        }
    }

    private buildCustomer(input: InputCreateCustomerDtoInterface): Customer {
        try {
            const address = new Address(
                input.address.street,
                input.address.number,
                input.address.zipCode,
                input.address.city,
            );

            const customer = new Customer(input.uuidGenerator.generate(), input.name);
            customer.address = address;
            customer.activate();

            return customer;
        } catch (error) {
            throw error;
        }
    }
}
