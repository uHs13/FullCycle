import AddProductFacadeInputDtoInterface from "./addProduct/add.product.facade.input.dto";
import AddProductFacadeOutputDtoInterface from "./addProduct/add.product.facade.output.dto";
import CheckProductStockAmountFacadeInputDto from "./checkProductStockAmount/check.product.stock.amount.facade.input.dto.interface";
import CheckProductStockAmountFacadeOutputDto from "./checkProductStockAmount/check.product.stock.amount.facade.output.dto.interface";

export default interface ProductAdminFacadeInterface {
    addProduct(input: AddProductFacadeInputDtoInterface): Promise<AddProductFacadeOutputDtoInterface>;
    checkProductStockAmount(input: CheckProductStockAmountFacadeInputDto): Promise<CheckProductStockAmountFacadeOutputDto>;
}
