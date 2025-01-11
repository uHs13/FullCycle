import Uuid from "../../../@shared/domain/valueObject/uuid.value.object";
import Invoice from "../../domain/invoice";
import Item from "../../domain/item";
import AddressValueObject from "../../domain/valueObject/address.value.object";
import GatewayInterface from "../../gateway/invoice.gateway.interface";
import InvoiceModel from "./model/invoice.model";
import ItemModel from "./model/item.model";

export default class InvoiceRepository implements GatewayInterface {
    async generate(invoice: Invoice): Promise<Invoice> {
        try {
            await InvoiceModel.create({
                id: invoice.id.value,
                name: invoice.name,
                document: invoice.document,
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
                items: invoice.items.map((item) => ({
                    id: item.id.value,
                    name: item.name,
                    price: item.price,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                })),
                createdAt: invoice.createdAt,
                updatedAt: invoice.updatedAt,
            }, {
                include: [{model: ItemModel}]
            });

            return invoice;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }

    async find(id: string): Promise<Invoice> {
        try {
            const foundInvoice = await InvoiceModel.findOne({
                where: {id: id},
                include: ItemModel,
            });

            return this.buildInvoice(foundInvoice);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }

    buildInvoice(foundInvoice: InvoiceModel): Invoice {
        const address = new AddressValueObject({
            street: foundInvoice.street,
            number: foundInvoice.number,
            complement: foundInvoice.complement,
            city: foundInvoice.city,
            state: foundInvoice.state,
            zipCode: foundInvoice.zipCode,
        });

        const items = foundInvoice.items.map((item) => {
            return new Item({
                id: new Uuid(item.id),
                name: item.name,
                price: item.price
            });
        });

        return new Invoice({
            id: new Uuid(foundInvoice.id),
            name: foundInvoice.name,
            document: foundInvoice.document,
            address: address,
            items: items
        });
    }
}
