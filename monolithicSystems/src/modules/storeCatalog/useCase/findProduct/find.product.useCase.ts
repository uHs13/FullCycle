import UseCaseInterface from "../../../@shared/useCase/useCase.interface";
import ProductGatewayInterface from "../../gateway/product.gateway.interface";
import { FindProductInputDto, FindProductOutputDto } from "./find.product.dto";

export default class FindProductUseCase implements UseCaseInterface {
    private productRepository: ProductGatewayInterface;

    constructor(repository: ProductGatewayInterface) {
        this.productRepository = repository;
    }

    async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
        try {
            const foundProduct = await this.productRepository.find(input.id);

            return {
                id: foundProduct.id.value,
                name: foundProduct.name,
                description: foundProduct.description,
                sellingPrice: foundProduct.sellingPrice
            };
        } catch(error) {
            throw new Error('Was not possible to find the product');
        }
    }
}
