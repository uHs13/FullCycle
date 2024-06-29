import Product from "../entity/product";
import ProductService from "./product.service";

describe('Product service unit tests', () => {
    it('should increase the products prices by a defined percentage', () => {
        const productOne = new Product('uuidOne', 'name one', 10);
        const productTwo = new Product('uuidTwo', 'name two', 20);
        const productThree = new Product('uuidThree', 'name three', 30);

        const products = [productOne, productTwo, productThree];

        ProductService.increasePriceByDefinedPercentage(products, 100);

        expect(productThree.price).toBe(60);
    });
});
