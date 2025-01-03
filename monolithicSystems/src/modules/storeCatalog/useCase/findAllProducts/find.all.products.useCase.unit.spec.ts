import Uuid from "../../../@shared/domain/valueObject/uuid.value.object";
import Product from "../../domain/product.entity";
import FindAllProductsUseCase from "./find.all.products.useCase";

describe('Find all products use case unit tests', () => {
    const productMock = new Product({
        id: new Uuid(),
        name: 'name',
        description: 'description',
        sellingPrice: 13
    });

    const productMockTwo = new Product({
        id: new Uuid(),
        name: 'name two',
        description: 'description two',
        sellingPrice: 13
    });

    const mockRepository = () => {
        return {
            find: jest.fn(),
            findAll: jest.fn().mockReturnValue(Promise.resolve([productMock, productMockTwo])),
        }
    };

    it('Should properly find all products', async () => {
        const productRepository = mockRepository();
        const useCase = new FindAllProductsUseCase(productRepository);

        const output = await useCase.execute({});
        const expectedOutput = {
            products: [
                {
                    id: productMock.id.value,
                    name: productMock.name,
                    description: productMock.description,
                    sellingPrice: productMock.sellingPrice
                },
                {
                    id: productMockTwo.id.value,
                    name: productMockTwo.name,
                    description: productMockTwo.description,
                    sellingPrice: productMockTwo.sellingPrice
                }
            ]
        };

        expect(productRepository.findAll).toHaveBeenCalled();
        expect(output).toEqual(expectedOutput);
    });
});
