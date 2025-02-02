import express, {Express} from "express";
import { Sequelize } from "sequelize-typescript";
import { Umzug } from "umzug";
import ProductModel from "../../modules/productAdmin/repository/sequelize/product.model.sequelize";
import ProductModelStoreCatalog from "../../modules/storeCatalog/repository/sequelize/product.model.sequelize";
import ClientModel from "../../modules/clientAdmin/repository/sequelize/client.model.sequelize";
import { migrator } from "../../migration/config/migrator";
import { routeGroups } from "./routes/routes";
import { productRouter } from "./routes/product/product.routes";

export const app: Express = express();
app.use(express.json());

app.use(routeGroups.product, productRouter);

export let sequelize: Sequelize;

export let migration: Umzug<any>;

export async function createConnection() {
    try {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false
        });

        sequelize.addModels([ProductModel, ProductModelStoreCatalog, ClientModel]);
        migration = migrator(sequelize)

        await migration.up()
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
    }
}

createConnection();