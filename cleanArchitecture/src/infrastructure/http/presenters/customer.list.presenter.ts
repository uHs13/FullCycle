import { toXML } from 'jstoxml';
import { OutputListCustomerDto } from "../../../domain/useCase/customer/list/list.customer.dto";

export default class CustomerListPresenter {
    static toXml(data: OutputListCustomerDto): string {
        const xmlOptions = {
            header: true,
            indent: " ",
            newLine: "\n",
            allowEmpty: true,
        };

        return toXML(
            {
                customers: {
                    customer: data.customers.map((customer) => ({
                        id: customer.id,
                        name: customer.name,
                        address: {
                            street: customer.address.street,
                            number: customer.address.number,
                            zipCode: customer.address.zipCode,
                            city: customer.address.city,
                        }
                    }))
                }
            },
            xmlOptions
        );
    }
}
