import Uuid from "../../../@shared/domain/valueObject/uuid.value.object";
import Product from "../../domain/product.entity";
import FindProductUseCase from "./find.product.useCase";

describe('Find product use case unit tests', () => {
    const uuid = new Uuid();
    const name = 'name';
    const description = 'description';
    const sellingPrice = 13;

    const product = new Product({
        id: uuid,
        name: name,
        description: description,
        sellingPrice: sellingPrice
    });

    const mockRepository = () => {
        return {
            find: jest.fn().mockReturnValue(Promise.resolve(product)),
            findAll: jest.fn()
        };
    }

    it('Should properly find a product', async () => {
        const productRepository = mockRepository();
        const useCase = new FindProductUseCase(productRepository);

        const input = {id: uuid.value};

        const output = await useCase.execute(input);

        expect(productRepository.find).toHaveBeenCalled();
        expect(output.id).toEqual(uuid.value);
        expect(output.name).toEqual(name);
        expect(output.description).toEqual(description);
        expect(output.sellingPrice).toEqual(sellingPrice);
    });
});
