import { FindAllProductFacadeOutputDtoInterface } from "./findAllProducts/find.all.products.facade.dto.interface";
import { FindProductFacadeInputDtoInterface, FindProductFacadeOutputDtoInterface } from "./findProduct/find.product.facade.dto.interface";

export default interface StoreCatalogFacadeInterface {
    find(input: FindProductFacadeInputDtoInterface): Promise<FindProductFacadeOutputDtoInterface>;
    findAll(): Promise<FindAllProductFacadeOutputDtoInterface>;
}
