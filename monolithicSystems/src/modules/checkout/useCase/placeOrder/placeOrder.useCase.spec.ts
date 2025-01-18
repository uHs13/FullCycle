import PlaceOrderUseCase from "./placeOrder.useCase";

describe('Place order use case unit tests', () => {
    describe('Find client method', () => {
        it('Should throw an error when client was not found', async () => {
            const mockClientAdminFacade = () => {
                return {
                    find: jest.fn().mockResolvedValue(null),
                    add: jest.fn()
                }
            }

            const useCaseProperties = {
                clientAdminFacade: mockClientAdminFacade()
            }

            const useCaseInput = {
                clientId: '',
                products: [
                    {
                        productId: ''
                    }
                ]
            };

            const useCase = new PlaceOrderUseCase(useCaseProperties);

            expect(async () => {
                await useCase.execute(useCaseInput);
            }).rejects.toThrow('Client not found');
        });

        it('Should throw an error when no product was selected', async () => {
            const mockClientAdminFacade = () => {
                return {
                    find: jest.fn().mockResolvedValue({
                        id: 'id',
                        name: 'name',
                        email: 'email'
                    }),
                    add: jest.fn()
                }
            }

            const useCaseProperties = {
                clientAdminFacade: mockClientAdminFacade()
            }

            const useCaseInput = {
                clientId: '',
                products: [
                    {
                        productId: ''
                    }
                ]
            };

            const useCase = new PlaceOrderUseCase(useCaseProperties);

            expect(async () => {
                await useCase.execute(useCaseInput);
            }).rejects.toThrow('Invalid product id');
        });
    });
});
