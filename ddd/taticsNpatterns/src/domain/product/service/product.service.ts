import Product from "../entity/product";

export default class ProductService {
    static increasePriceByDefinedPercentage(
        products: Product[],
        percentageAsInteger: number
    ): void {
        let percentage = percentageAsInteger / 100;

        products.forEach(product => {
            product.changePrice(product.price + (product.price * percentage));
        });
    }
}
