import ProductRepositoryInterface from "../../../product/repository/productRepositoryInterface";
import { InputListProductDtoInterface, OutputListProductDtoInterface } from "./list.product.dto";

export default class ListProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    };

    public async execute(input: InputListProductDtoInterface): Promise<OutputListProductDtoInterface> {
        try {
            const foundProducts = await this.productRepository.findAll();

            return {
                products: foundProducts.map((product) => ({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                }))
            };
        } catch (error) {
            throw error;
        }
    }
}
