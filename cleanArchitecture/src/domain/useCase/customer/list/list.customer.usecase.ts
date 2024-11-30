import CustomerRepositoryInterface from "../../../customer/repository/customerRepositoryInterface";
import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto";

export default class ListCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    public async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const foundCustomers = await this.customerRepository.findAll();

        return {
            customers: foundCustomers.map((customer) => ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.address.street,
                    number: customer.address.number,
                    zipCode: customer.address.zip,
                    city: customer.address.city,
                }
            }))
        };
    }
}
