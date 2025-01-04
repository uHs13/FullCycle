import StoreCatalogFacade from "../facade/storeCatalog.facade";
import StoreCatalogFacadeInterface from "../facade/storeCatalog.facade.interface";
import ProductRepository from "../repository/sequelize/product.repository";
import FindAllProductsUseCase from "../useCase/findAllProducts/find.all.products.useCase";
import FindProductUseCase from "../useCase/findProduct/find.product.useCase";

export default class StoreCatalogFacadeFactory {
    make(): StoreCatalogFacadeInterface {
        const productRepository = new ProductRepository();

        const findProductUseCase = new FindProductUseCase(productRepository);
        const findAllProductsUseCase = new FindAllProductsUseCase(productRepository);

        const facade = new StoreCatalogFacade({
            findProductUseCase: findProductUseCase,
            findAllProductsUseCase: findAllProductsUseCase
        });

        return facade;
    }
}
