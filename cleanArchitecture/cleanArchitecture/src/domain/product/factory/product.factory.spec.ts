import ProductFactory from "./product.factory";

describe('Product Factory Unit Tests', () => {
    it('Should properly create a product', () => {
        const productName = 'Black and White Tshirt';
        const productPrice = 13;

        const product = ProductFactory.create('A', productName, productPrice);

        expect(product.id).toBeDefined();
        expect(product.name).toBe(productName);
        expect(product.price).toBe(productPrice);
        expect(product.constructor.name).toBe('Product');
    });

    it('Should properly create a productB', () => {
        const productName = 'Black and White Tshirt';
        const productPrice = 13;

        const product = ProductFactory.create('B', productName, productPrice);

        expect(product.id).toBeDefined();
        expect(product.name).toBe(productName);
        expect(product.price).toBe(productPrice * 2);
        expect(product.constructor.name).toBe('ProductB');
    });

    it('Should throw an error when product type is not valid', () => {
        expect(() => ProductFactory.create('C', 'B', 27)).toThrow('Invalid product type');
    });
});
