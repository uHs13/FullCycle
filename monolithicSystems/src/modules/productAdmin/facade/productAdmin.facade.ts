import UseCaseInterface from "../../@shared/useCase/useCase.interface";
import AddProductFacadeInputDtoInterface from "./addProduct/add.product.facade.input.dto";
import AddProductFacadeOutputDtoInterface from "./addProduct/add.product.facade.output.dto";
import CheckProductStockAmountFacadeInputDto from "./checkProductStockAmount/check.product.stock.amount.facade.input.dto.interface";
import CheckProductStockAmountFacadeOutputDto from "./checkProductStockAmount/check.product.stock.amount.facade.output.dto.interface";
import ProductAdminFacadeInterface from "./productAdmin.facade.interface";

export interface UseCaseProperties {
    addProductUseCase: UseCaseInterface;
    checkProductStockAmountUseCase: UseCaseInterface;
}

export default class ProductAdminFacade implements ProductAdminFacadeInterface {
    private addProductUseCase: UseCaseInterface;
    private checkProductStockAmountUseCase: UseCaseInterface;

    constructor(useCaseProperties: UseCaseProperties) {
        this.addProductUseCase = useCaseProperties.addProductUseCase;
        this.checkProductStockAmountUseCase = useCaseProperties.checkProductStockAmountUseCase;
    }

    async addProduct(input: AddProductFacadeInputDtoInterface): Promise<AddProductFacadeOutputDtoInterface> {
        return await this.addProductUseCase.execute(input);
    }

    async checkProductStockAmount(input: CheckProductStockAmountFacadeInputDto): Promise<CheckProductStockAmountFacadeOutputDto> {
        return await this.checkProductStockAmountUseCase.execute(input);
    }
}
