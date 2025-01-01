import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/sequelize/product.model.sequelize";
import ProductAdminFacadeFactory from "./productAdmin.facade.factory";

describe('Product Admin factory integration tests', () => {
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

    it('should properly create a product using admin facade factory', async () => {
        const productFacade = (new ProductAdminFacadeFactory()).make();

        const name = 'product';
        const description = 'description';
        const purchasePrice = 13;
        const stockAmount = 13;

        const facadeInput = {
            name: name,
            description: description,
            purchasePrice: purchasePrice,
            stockAmount: stockAmount
        }

        const createdProduct = await productFacade.addProduct(facadeInput);

        const foundProduct = await ProductModel.findOne({where: {id: createdProduct.id}});

        expect(foundProduct).toBeDefined();
        expect(foundProduct.id).toEqual(createdProduct.id);
        expect(foundProduct.name).toEqual(facadeInput.name);
        expect(foundProduct.description).toEqual(facadeInput.description);
        expect(foundProduct.purchasePrice).toEqual(facadeInput.purchasePrice);
        expect(foundProduct.stockAmount).toEqual(facadeInput.stockAmount);
    });
});
