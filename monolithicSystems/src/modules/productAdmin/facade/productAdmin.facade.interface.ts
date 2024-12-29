import AddProductFacadeInputDtoInterface from "./add.product.facade.input.dto"
import CheckProductStockAmountFacadeInputDto from "./check.product.stock.amount.facade.input.dto.interface";
import CheckProductStockAmountFacadeOutputDto from "./check.product.stock.amount.facade.output.dto.interface";

export default interface ProductAdminFacadeInterface {
    addProduct(input: AddProductFacadeInputDtoInterface): Promise<void>;
    checkProductStockAmount(input: CheckProductStockAmountFacadeInputDto): Promise<CheckProductStockAmountFacadeOutputDto>;
}
