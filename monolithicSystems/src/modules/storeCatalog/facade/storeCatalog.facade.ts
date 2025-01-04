import UseCaseInterface from "../../@shared/useCase/useCase.interface";
import { FindAllProductFacadeOutputDtoInterface } from "./findAllProducts/find.all.products.facade.dto.interface";
import { FindProductFacadeInputDtoInterface, FindProductFacadeOutputDtoInterface } from "./findProduct/find.product.facade.dto.interface";
import StoreCatalogFacadeInterface from "./storeCatalog.facade.interface";

export interface StoreCatalogProperties {
    findProductUseCase: UseCaseInterface,
    findAllProductsUseCase: UseCaseInterface,
};

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
    private findProductUseCase: UseCaseInterface;
    private findAllProductsUseCase: UseCaseInterface;

    constructor(input: StoreCatalogProperties) {
        this.findProductUseCase = input.findProductUseCase;
        this.findAllProductsUseCase = input.findAllProductsUseCase;
    }

    async find(input: FindProductFacadeInputDtoInterface): Promise<FindProductFacadeOutputDtoInterface> {
        return await this.findProductUseCase.execute(input);
    }

    async findAll(): Promise<FindAllProductFacadeOutputDtoInterface> {
        return await this.findAllProductsUseCase.execute({});
    }
}
