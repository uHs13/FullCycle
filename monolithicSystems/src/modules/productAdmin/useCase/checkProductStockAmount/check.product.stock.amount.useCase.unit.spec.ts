import Uuid from "../../../@shared/domain/valueObject/uuid.value.object";
import Product from "../../domain/product.entity";
import CheckProductStockAmountUseCase from "./check.product.stock.amount.useCase";

describe('Check product stock amount use case unit test', () => {
    const uuid = new Uuid();
    const stockAmount = 13;

    const product = new Product({
        id: uuid,
        name: 'name',
        description: 'description',
        purchasePrice: 13,
        stockAmount: stockAmount
    });

    const mockRepository = () => {
        return {
            add: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(product))
        };
    };

    it('Should properly check product stock amount', async () => {
        const productRepository = mockRepository();

        const useCase = new CheckProductStockAmountUseCase(productRepository);

        const input = {id: uuid.value};

        const output = await useCase.execute(input);

        expect(productRepository.find).toHaveBeenCalled();
        expect(output.id).toEqual(input.id);
        expect(output.stockAmount).toEqual(stockAmount);
    });
});
