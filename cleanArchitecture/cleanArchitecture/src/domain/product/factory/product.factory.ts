import Product from "../entity/product";
import ProductInterface from "../entity/product.interface";
import ProductB from "../entity/productB";

export default class ProductFactory {
    public static create(
        type: string,
        name: string,
        price: number
    ): ProductInterface {
        switch (type) {
            case 'A':
                return new Product('uuid', name, price);
            case 'B':
                return new ProductB('uuid', name, price);
            default:
                throw new Error('Invalid product type');
        }
    }
}
