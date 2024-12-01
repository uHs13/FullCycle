import Product from "../../../product/entity/product";
import ProductRepositoryInterface from "../../../product/repository/productRepositoryInterface";
import { InputUpdateProductDtoInterface } from "./update.product.dto";

export default class UpdateProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    public async execute(input: InputUpdateProductDtoInterface): Promise<InputUpdateProductDtoInterface> {
        try {
            const product = await this.findProduct(input.id);
            product.changeName(input.name);
            product.changePrice(input.price);

            await this.productRepository.update(product);

            return {
                id: product.id,
                name: product.name,
                price: product.price,
            };
        } catch(error) {
            throw error
        }
    }

    private async findProduct(id: string): Promise<Product> {
        try {
            return await this.productRepository.find(id);
        } catch (error) {
            throw error;
        }
    }
}
