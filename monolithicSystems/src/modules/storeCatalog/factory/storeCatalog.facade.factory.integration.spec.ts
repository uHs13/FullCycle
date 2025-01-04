import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/sequelize/product.model.sequelize";
import Uuid from "../../@shared/domain/valueObject/uuid.value.object";
import StoreCatalogFacadeFactory from "./storeCatalog.facade.factory";

describe('Store catalog facade factory integration tests', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close()
    });

    it('Should properly find a product using factory', async () => {
        const facade = new StoreCatalogFacadeFactory().make();

        const uuid = new Uuid();
        const name = 'name';
        const description = 'description';
        const sellingPrice = 13;

        await ProductModel.create({
            id: uuid.value,
            name: name,
            description: description,
            sellingPrice: sellingPrice
        });

        const output = await facade.find({id: uuid.value});

        expect(output.id).toEqual(uuid.value);
        expect(output.name).toEqual(name);
        expect(output.description).toEqual(description);
        expect(output.sellingPrice).toEqual(sellingPrice);
    });

    it('Should properly find all products using factory', async () => {
        const facade = new StoreCatalogFacadeFactory().make();

        const uuid = new Uuid();
        const name = 'name';
        const description = 'description';
        const sellingPrice = 13;

        await ProductModel.create({
            id: uuid.value,
            name: name,
            description: description,
            sellingPrice: sellingPrice
        });

        const output = await facade.findAll();

        expect(output).toEqual({
            products : [
                {
                    id: uuid.value,
                    name: name,
                    description: description,
                    sellingPrice: sellingPrice
                }
            ]
        });
    });
});
