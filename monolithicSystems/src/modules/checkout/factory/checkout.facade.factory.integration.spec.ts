import { Sequelize } from "sequelize-typescript";
import ClientAdminFacadeFactory from "../../clientAdmin/factory/clientAdmin.facade.factory";
import ProductAdminFacadeFactory from "../../productAdmin/factory/productAdmin.facade.factory";
import ClientModel from "../../clientAdmin/repository/sequelize/client.model.sequelize";
import ProductModel from "../../productAdmin/repository/sequelize/product.model.sequelize";
import ProductModelStoreCatalog from "../../storeCatalog/repository/sequelize/product.model.sequelize";
import TransactionModel from "../../payment/repository/sequelize/transaction.model";
import InvoiceModel from "../../invoice/repository/sequelize/model/invoice.model";
import OrderModel from "../repository/sequelize/order.model.sequelize";
import ItemModel from "../../invoice/repository/sequelize/model/item.model";
import { migrator } from "../../../migration/config/migrator";
import { Umzug } from "umzug";
import CheckoutFacadeFactory from "./checkout.facade.factory";

describe('Checkout facade factory integration tests', () => {
    let sequelize: Sequelize;
    let migration: Umzug<any>;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false
        });

        await sequelize.addModels([
            ClientModel,
            ProductModel,
            ProductModelStoreCatalog,
            TransactionModel,
            ItemModel,
            InvoiceModel,
            OrderModel
        ]);

        migration = migrator(sequelize);

        await migration.up();
        await sequelize.sync();
    });

    afterEach(async () => {
        await migration.down();
        await sequelize.close();
    });

    it('Should properly place a order', async () => {
        const clientAdminFacade = (new ClientAdminFacadeFactory()).make();
        const productAdminFacade = (new ProductAdminFacadeFactory()).make();

        const checkoutFacade = (new CheckoutFacadeFactory()).make();

        const createdClient = await clientAdminFacade.add({
            name: 'string',
            document: 'string',
            email: 'string',
            street: 'string',
            number: 'string',
            complement: 'string',
            city: 'string',
            state: 'string',
            zipCode: 'string',
        });

        const createdProduct = await productAdminFacade.addProduct({
            name: 'name',
            description: 'description',
            purchasePrice: 130,
            stockAmount: 130
        });

        const input = {
            clientId: createdClient.id,
            products: [
                {
                    productId: createdProduct.id
                }
            ]
        };

        const output = await checkoutFacade.placeOrder(input);

        expect(output.id).toBeDefined();
        expect(output.invoiceId).toBeDefined();
        expect(output.status).toEqual('approved');
        expect(output.total).toEqual(100);
        expect(output.products).toEqual([{productId: input.products[0].productId}]);
    });
});
