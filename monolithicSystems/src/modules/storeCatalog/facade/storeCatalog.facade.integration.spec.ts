import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../repository/sequelize/product.repository";
import FindAllProductsUseCase from "../useCase/findAllProducts/find.all.products.useCase";
import FindProductUseCase from "../useCase/findProduct/find.product.useCase";
import ProductModel from "../repository/sequelize/product.model.sequelize";
import Uuid from "../../@shared/domain/valueObject/uuid.value.object";
import StoreCatalogFacade from "./storeCatalog.facade";

describe('Store catalog facade integration tests', () => {
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

    it('Should properly find a product', async () => {
        const productRepository = new ProductRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);
        const findAllProductsUseCase = new FindAllProductsUseCase(productRepository);

        const facade = new StoreCatalogFacade({
            findProductUseCase: findProductUseCase,
            findAllProductsUseCase: findAllProductsUseCase
        });

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

    it('Should properly find all products', async () => {
        const productRepository = new ProductRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);
        const findAllProductsUseCase = new FindAllProductsUseCase(productRepository);

        const facade = new StoreCatalogFacade({
            findProductUseCase: findProductUseCase,
            findAllProductsUseCase: findAllProductsUseCase
        });

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
