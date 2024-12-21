import AddProductUseCase from "./add.product.usecase";

describe('Add product use case unit tests', () => {
    const mockRepository = () => {
        return {
            add: jest.fn(),
            find: jest.fn(),
        };
    };

    it('Should properly add a product', async () => {
        const productRepository = mockRepository();

        const useCase = new AddProductUseCase(productRepository);

        const input = {
            name: 'Product',
            description: 'Product description',
            purchasePrice: 13,
            stockAmount: 13,
        };

        const output = await useCase.execute(input);

        expect(productRepository.add).toHaveBeenCalled();
        expect(output.id).toBeDefined();
        expect(output.name).toBe(input.name);
        expect(output.description).toBe(input.description);
        expect(output.purchasePrice).toBe(input.purchasePrice);
        expect(output.stockAmount).toBe(input.stockAmount);
    });
});
