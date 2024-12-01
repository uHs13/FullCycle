import Product from "../../../product/entity/product";
import ListProductUseCase from "./list.product.usecase";

describe('List product use case unit tests', () => {
    const uuid = 'uuid';
    const name = 'Black and White T-shirt';
    const price = 13;

    const product = new Product(uuid, name, price);

    const mockProductRepository = () => {
        return {
            create: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn().mockReturnValue(Promise.resolve([product])),
        };
    };

    it('Should properly list the products', async () => {
        const productRepository = mockProductRepository();
        const useCase = new ListProductUseCase(productRepository);

        const output = await useCase.execute({});

        const expectedOutput = {
            products: [
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                }
            ]
        };

        expect(output).toStrictEqual(expectedOutput);
    });
});
