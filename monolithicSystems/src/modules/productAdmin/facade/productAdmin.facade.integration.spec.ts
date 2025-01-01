import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/sequelize/product.model.sequelize";
import ProductRepository from "../repository/sequelize/product.repository";
import AddProductUseCase from "../useCase/addProduct/add.product.usecase";
import ProductAdminFacade from "./productAdmin.facade";
import Uuid from "../../@shared/domain/valueObject/uuid.value.object";
import CheckProductStockAmountUseCase from "../useCase/checkProductStockAmount/check.product.stock.amount.useCase";

describe('Product Admin facade integration tests', () => {
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

    it('should properly add a product', async () => {
        const productRepository = new ProductRepository();

        const useCase = new AddProductUseCase(productRepository);

        const productAdminFacade = new ProductAdminFacade({
            addProductUseCase: useCase,
            checkProductStockAmountUseCase: undefined
        });

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

        const createdProduct = await productAdminFacade.addProduct(facadeInput);

        const foundProduct = await ProductModel.findOne({where: {id: createdProduct.id}});

        expect(foundProduct).toBeDefined();
        expect(foundProduct.id).toEqual(createdProduct.id);
        expect(foundProduct.name).toEqual(facadeInput.name);
        expect(foundProduct.description).toEqual(facadeInput.description);
        expect(foundProduct.purchasePrice).toEqual(facadeInput.purchasePrice);
        expect(foundProduct.stockAmount).toEqual(facadeInput.stockAmount);
    });

    it('should properly check the stock amount of a product', async () => {
        const productRepository = new ProductRepository();

        const addProductUseCase = new AddProductUseCase(productRepository);
        const checkProductStockAmountUseCase = new CheckProductStockAmountUseCase(productRepository);

        const productAdminFacade = new ProductAdminFacade({
            addProductUseCase: addProductUseCase,
            checkProductStockAmountUseCase: checkProductStockAmountUseCase
        });

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

        const createdProduct = await productAdminFacade.addProduct(facadeInput);

        const foundProduct = await productAdminFacade.checkProductStockAmount({id: createdProduct.id});

        expect(foundProduct).toBeDefined();
        expect(foundProduct.id).toEqual(createdProduct.id);
        expect(foundProduct.stockAmount).toEqual(facadeInput.stockAmount);
    });
});
