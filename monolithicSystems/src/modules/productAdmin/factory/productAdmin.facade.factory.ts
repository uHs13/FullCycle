import ProductAdminFacade from "../facade/productAdmin.facade";
import ProductAdminFacadeInterface from "../facade/productAdmin.facade.interface";
import ProductRepository from "../repository/sequelize/product.repository";
import AddProductUseCase from "../useCase/addProduct/add.product.usecase";
import CheckProductStockAmountUseCase from "../useCase/checkProductStockAmount/check.product.stock.amount.useCase";

export default class ProductAdminFacadeFactory {
    make(): ProductAdminFacadeInterface {
        const productRepository = new ProductRepository();
        const useCase = new AddProductUseCase(productRepository);

        const checkProductStockAmountUseCase = new CheckProductStockAmountUseCase(productRepository);

        const productAdminFacade = new ProductAdminFacade({
            addProductUseCase: useCase,
            checkProductStockAmountUseCase: checkProductStockAmountUseCase
        });

        return productAdminFacade;
    }
}
