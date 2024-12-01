import Product from "../../../product/entity/product";
import ProductRepositoryInterface from "../../../product/repository/productRepositoryInterface";
import { InputCreateProductDtoInterface, OutputCreateProductDtoInterface } from "./create.product.dto";

export default class CreateProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    public async execute(input: InputCreateProductDtoInterface): Promise<OutputCreateProductDtoInterface> {
        const product = this.buildProduct(input);

        await this.productRepository.create(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
        };
    }

    private buildProduct(input: InputCreateProductDtoInterface): Product {
        try {
            const product = new Product(
                input.uuidGenerator.generate(),
                input.name,
                input.price
            );

            return product;
        } catch (error) {
            throw error;
        }
    }
};
