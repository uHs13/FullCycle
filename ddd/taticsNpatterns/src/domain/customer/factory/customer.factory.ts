import Customer from "../entity/customer";
import Address from "../valueObject/address";

export default class CustomerFactory {
    public static create(name: string): Customer {
        return new Customer('uuid', name);
    }

    public static createWithAddress(name: string, address: Address): Customer {
        const customer = new Customer('uuid', name);
        customer.address = address;

        return customer;
    }
}
