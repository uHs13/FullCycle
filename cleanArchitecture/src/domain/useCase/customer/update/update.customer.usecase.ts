import Customer from "../../../customer/entity/customer";
import CustomerRepositoryInterface from "../../../customer/repository/customerRepositoryInterface";
import Address from "../../../customer/valueObject/address";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto";

export default class UpdateCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    public async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
        try {
            const customer = await this.findCustomer(input.id);
            customer.changeName(input.name);

            const address = new Address(
                input.address.street,
                input.address.number,
                input.address.zipCode,
                input.address.city,
            );

            customer.address = address;

            await this.customerRepository.update(customer);

            return {
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.address.street,
                    number: customer.address.number,
                    zipCode: customer.address.zip,
                    city: customer.address.city,
                }
            };
        } catch (error) {
            throw error;
        }
    }

    private async findCustomer(id: string): Promise<Customer> {
        try {
            return await this.customerRepository.find(id);
        } catch (error) {
            throw error;
        }
    }
}
