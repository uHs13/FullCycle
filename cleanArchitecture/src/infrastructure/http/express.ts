import express, {Express} from "express";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../customer/repository/sequelize/customer.model";
import { customerRouter } from "./routes/customer/customer.routes";
import { productRouter } from "./routes/product/product.routes";
import { routeGroups } from "./routes/routes";
import ProductModel from "../product/repository/sequelize/product.model";

export const app: Express = express();
app.use(express.json());

app.use(routeGroups.customer, customerRouter);
app.use(routeGroups.product, productRouter);

export let sequelize: Sequelize;

async function createConnection() {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
    });

    await sequelize.addModels([CustomerModel, ProductModel]);
    await sequelize.sync();
}

createConnection();
