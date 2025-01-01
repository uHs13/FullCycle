import ProductGatewayInterface from "../../gateway/product.gateway.interface";
import { CheckProductStockAmountInputDtoInterface, CheckProductStockAmountOutputDtoInterface } from "./check.product.stock.amount.dto";

export default class CheckProductStockAmountUseCase {
    private productRepository: ProductGatewayInterface;

    constructor(repository: ProductGatewayInterface) {
        this.productRepository = repository;
    }

    async execute(input: CheckProductStockAmountInputDtoInterface): Promise<CheckProductStockAmountOutputDtoInterface> {
        try {
            const foundProduct = await this.productRepository.find(input.id);

            return {
                id: foundProduct.id.value,
                stockAmount: foundProduct.stockAmount
            };
        } catch(error) {
            throw new Error('Was not possible to check the product stock amount');
        }
    }
};
