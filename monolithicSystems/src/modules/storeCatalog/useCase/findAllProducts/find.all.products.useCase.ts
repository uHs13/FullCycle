import UseCaseInterface from "../../../@shared/useCase/useCase.interface";
import ProductGatewayInterface from "../../gateway/product.gateway.interface";
import { FindAllProductsDtoInput, FindAllProductsDtoOutput } from "./find.all.products.dto";

export default class FindAllProductsUseCase implements UseCaseInterface {
    private repository: ProductGatewayInterface;

    constructor(repository: ProductGatewayInterface) {
        this.repository = repository;
    }

    async execute(input: FindAllProductsDtoInput): Promise<FindAllProductsDtoOutput> {
        const foundProducts = await this.repository.findAll();

        return {
            products: foundProducts.map((product) => ({
                id: product.id.value,
                name: product.name,
                description: product.description,
                sellingPrice: product.sellingPrice
            }))
        };
    }
}
