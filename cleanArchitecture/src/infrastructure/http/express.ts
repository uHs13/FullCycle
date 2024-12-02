import express, {Express} from "express";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../customer/repository/sequelize/customer.model";
import { customerRouter } from "./routes/customer/customer.routes";
import { routeGroups } from "./routes/routes";

export const app: Express = express();
app.use(express.json());

app.use(routeGroups.customer, customerRouter);

export let sequelize: Sequelize;

async function createConnection() {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
}

createConnection();
