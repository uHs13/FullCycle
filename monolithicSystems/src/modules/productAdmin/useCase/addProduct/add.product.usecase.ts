import Uuid from "../../../@shared/domain/valueObject/uuid.value.object";
import Product from "../../domain/product.entity";
import ProductGatewayInterface from "../../gateway/product.gateway.interface";
import { AddProductUseCaseInputDto, AddProductUseCaseOutputDto } from "./add.product.dto";

export default class AddProductUseCase {
    private _productRepository: ProductGatewayInterface;

    constructor(repository: ProductGatewayInterface) {
        this._productRepository = repository;
    }

    async execute(input: AddProductUseCaseInputDto): Promise<AddProductUseCaseOutputDto> {
        try {
            const productProperties = {
                id: new Uuid(),
                name: input.name,
                description: input.description,
                purchasePrice: input.purchasePrice,
                stockAmount: input.stockAmount
            };

            const product = new Product(productProperties);

            this._productRepository.add(product);

            return {
                id: product.id.value,
                name: product.name,
                description: product.description,
                purchasePrice: product.purchasePrice,
                stockAmount: product.stockAmount,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
            };
        } catch (error) {
            throw new Error('Was not possible to create the product');
        }
    }
}
