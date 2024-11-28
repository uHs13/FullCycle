import Product from "./product";

describe('Product unit tests', () => {
    it('should throw an exception when try to instantiate a product with empty id', () => {
        expect(() => {
            new Product('', 'Product name', 13);
        }).toThrow('The id is required');
    });

    it('should throw an exception when try to instantiate a product with empty name', () => {
        expect(() => {
            new Product('uuid', '', 13);
        }).toThrow('The name is required');
    });

    it('should throw an exception when try to instantiate a product with negative price', () => {
        expect(() => {
            new Product('uuid', 'Product name', -1);
        }).toThrow('The price must be greater or equal to zero');
    });

    it('should throw an exception when try to change the product name to an empty name', () => {
        expect(() => {
            const product = new Product('uuid', 'Product name', 13);
            product.changeName('');
        }).toThrow('The name is required');
    });

    it('should throw an exception when try to change the product price to a negative value', () => {
        expect(() => {
            const product = new Product('uuid', 'Product name', 13);
            product.changePrice(-1);
        }).toThrow('The price must be greater or equal to zero');
    });

    it('should change name', () => {
        const product = new Product('uuid', 'Product name', 13);
        product.changeName('Product A');

        expect(product.name).toBe('Product A');
    });

    it('should change price', () => {
        const product = new Product('uuid', 'Product name', 9);
        product.changePrice(13);

        expect(product.price).toBe(13);
    });
});
