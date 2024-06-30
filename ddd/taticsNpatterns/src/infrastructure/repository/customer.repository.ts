import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customerRepositoryInterface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            active: entity.isActive(),
            street: entity.address.street,
            number: entity.address.number,
            zip: entity.address.zip,
            city: entity.address.city,
        });
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update(
            {
                name: entity.name,
                active: entity.isActive(),
                street: entity.address.street,
                number: entity.address.number,
                zip: entity.address.zip,
                city: entity.address.city,
            },
            {
                where: {id: entity.id}
            }
        );
    }

    async find(id: string): Promise<Customer> {
        let customerModel = new CustomerModel();

        try {
            customerModel = await CustomerModel.findOne({
                where: {id: id},
                rejectOnEmpty: true
            });
        } catch (error) {
            throw new Error('Customer not found');
        }

        const address = new Address(
            customerModel.street,
            customerModel.number,
            customerModel.zip,
            customerModel.city,
        );

        const customer = new Customer(
            customerModel.id,
            customerModel.name,
        );

        customer.active = customerModel.active

        customer.address = address

        return customer;
    }

    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();

        let customers: Customer[] = [];

        customerModels.forEach(customer => {
            const address = new Address(
                customer.street,
                customer.number,
                customer.zip,
                customer.city,
            );

            const customerObject = new Customer(
                customer.id,
                customer.name
            );

            customerObject.active = customer.active;
            customerObject.address = address;

            customers.push(customerObject);
        });

        return customers;
    }
}
