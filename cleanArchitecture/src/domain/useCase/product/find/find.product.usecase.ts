import ProductRepositoryInterface from "../../../product/repository/productRepositoryInterface";
import { InputFindProductDtoInterface, OutputFindProductDtoInterface } from "./find.product.dto";

export default class FindProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    };

    public async execute(input: InputFindProductDtoInterface): Promise<OutputFindProductDtoInterface> {
        try {
            const product = await this.productRepository.find(input.id);

            return {
                id: product.id,
                name: product.name,
                price: product.price,
            }
        } catch (error) {
            throw error;
        }
    }
}
