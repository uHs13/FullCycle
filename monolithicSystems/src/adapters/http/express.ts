import express, {Express} from "express";
import { Sequelize } from "sequelize-typescript";
import { Umzug } from "umzug";
import ProductModel from "../../modules/productAdmin/repository/sequelize/product.model.sequelize";
import ProductModelStoreCatalog from "../../modules/storeCatalog/repository/sequelize/product.model.sequelize";
import ClientModel from "../../modules/clientAdmin/repository/sequelize/client.model.sequelize";
import { migrator } from "../../migration/config/migrator";
import { routeGroups } from "./routes/routes";
import { productRouter } from "./routes/product/product.routes";
import { clientRouter } from "./routes/client/client.routes";
import { checkoutRouter } from "./routes/checkout/checkout.routes";
import TransactionModel from "../../modules/payment/repository/sequelize/transaction.model";
import ItemModel from "../../modules/invoice/repository/sequelize/model/item.model";
import InvoiceModel from "../../modules/invoice/repository/sequelize/model/invoice.model";
import OrderModel from "../../modules/checkout/repository/sequelize/order.model.sequelize";
import { invoiceRouter } from "./routes/invoice/invoice.routes";

export const app: Express = express();
app.use(express.json());

app.use(routeGroups.product, productRouter);
app.use(routeGroups.client, clientRouter);
app.use(routeGroups.checkout, checkoutRouter);
app.use(routeGroups.invoice, invoiceRouter);

export let sequelize: Sequelize;

export let migration: Umzug<any>;

export async function createConnection() {
    try {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false
        });

        sequelize.addModels([
            ClientModel,
            ProductModel,
            ProductModelStoreCatalog,
            TransactionModel,
            ItemModel,
            InvoiceModel,
            OrderModel
        ]);

        migration = migrator(sequelize)

        await migration.up()
        await sequelize.sync()
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
    }
}

createConnection();