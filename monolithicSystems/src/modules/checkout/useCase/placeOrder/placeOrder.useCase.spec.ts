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

            const mockProductAdminFacade = () => {
                return {
                    addProduct: jest.fn(),
                    checkProductStockAmount: jest.fn()
                }
            }

            const mockStoreCatalogFacade = () => {
                return {
                    find: jest.fn().mockRejectedValue(new Error('productError')),
                    findAll: jest.fn()
                }
            }

            const useCaseProperties = {
                clientAdminFacade: mockClientAdminFacade(),
                productAdminFacade: mockProductAdminFacade(),
                storeCatalogFacade: mockStoreCatalogFacade(),
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
    });

    describe('Validate products method', () => {
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

            const mockProductAdminFacade = () => {
                return {
                    addProduct: jest.fn(),
                    checkProductStockAmount: jest.fn()
                }
            }

            const mockStoreCatalogFacade = () => {
                return {
                    find: jest.fn().mockRejectedValue(new Error('productError')),
                    findAll: jest.fn()
                }
            }

            const useCaseProperties = {
                clientAdminFacade: mockClientAdminFacade(),
                productAdminFacade: mockProductAdminFacade(),
                storeCatalogFacade: mockStoreCatalogFacade(),
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

        it('Should throw an error when product is out of stock', async () => {
            const productError = 'Product out of stock';

            expect(async () => {
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

                const mockProductAdminFacade = () => {
                    return {
                        addProduct: jest.fn(),
                        checkProductStockAmount: jest.fn().mockResolvedValue({
                            id: 'id',
                            stockAmount: 0
                        })
                    }
                }

                const mockStoreCatalogFacade = () => {
                    return {
                        find: jest.fn().mockRejectedValue(new Error(productError)),
                        findAll: jest.fn()
                    }
                }

                const useCaseProperties = {
                    clientAdminFacade: mockClientAdminFacade(),
                    productAdminFacade: mockProductAdminFacade(),
                    storeCatalogFacade: mockStoreCatalogFacade(),
                }

                const useCaseInput = {
                    clientId: '208a9b9e-c0a9-418b-9763-3d6cfcc8904c',
                    products: [
                        {
                            productId: 'e634870e-5378-432d-85b6-a0af105dde55'
                        }
                    ]
                };

                const useCase = new PlaceOrderUseCase(useCaseProperties);
                await useCase.execute(useCaseInput);    
            }).rejects.toThrow(productError);
        });

        it('Should throw an error when product does not exist', async () => {
            const productError = 'Was not possible to check the product stock amount';

            expect(async () => {
                const mockClientAdminFacade = () => {
                    return {
                        find: jest.fn().mockRejectedValue(new Error(productError)),
                        add: jest.fn()
                    }
                }

                const mockProductAdminFacade = () => {
                    return {
                        addProduct: jest.fn(),
                        checkProductStockAmount: jest.fn().mockResolvedValue({
                            id: 'e634870e-5378-432d-85b6-a0af105dde55',
                            stockAmount: 0
                        })
                    }
                }

                const mockStoreCatalogFacade = () => {
                    return {
                        find: jest.fn().mockRejectedValue(new Error(productError)),
                        findAll: jest.fn()
                    }
                }

                const useCaseProperties = {
                    clientAdminFacade: mockClientAdminFacade(),
                    productAdminFacade: mockProductAdminFacade(),
                    storeCatalogFacade: mockStoreCatalogFacade(),
                }

                const useCaseInput = {
                    clientId: '208a9b9e-c0a9-418b-9763-3d6cfcc8904c',
                    products: [
                        {
                            productId: 'e634870e-5378-432d-85b6-a0af105dde55'
                        }
                    ]
                };

                const useCase = new PlaceOrderUseCase(useCaseProperties);
                await useCase.execute(useCaseInput);    
            }).rejects.toThrow(productError);
        });
    });

    describe('Get products unit tests', () => {
        it('Should throw an error when product was not found', async () => {
            const productError = 'Was not possible to find the product';

            expect(async () => {
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

                const mockProductAdminFacade = () => {
                    return {
                        addProduct: jest.fn(),
                        checkProductStockAmount: jest.fn().mockResolvedValue({
                            id: 'e634870e-5378-432d-85b6-a0af105dde55',
                            stockAmount: 13
                        })
                    }
                }

                const mockStoreCatalogFacade = () => {
                    return {
                        find: jest.fn().mockRejectedValue(new Error(productError)),
                        findAll: jest.fn()
                    }
                }

                const useCaseProperties = {
                    clientAdminFacade: mockClientAdminFacade(),
                    productAdminFacade: mockProductAdminFacade(),
                    storeCatalogFacade: mockStoreCatalogFacade(),
                }

                const useCaseInput = {
                    clientId: '208a9b9e-c0a9-418b-9763-3d6cfcc8904c',
                    products: [
                        {
                            productId: 'e634870e-5378-432d-85b6-a0af105dde55'
                        }
                    ]
                };

                const useCase = new PlaceOrderUseCase(useCaseProperties);
                await useCase.execute(useCaseInput);    
            }).rejects.toThrow(productError);
        });

        it('Should throw an error when product was not found', async () => {
            const productError = 'Was not possible to find the product';

            expect(async () => {
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

                const mockProductAdminFacade = () => {
                    return {
                        addProduct: jest.fn(),
                        checkProductStockAmount: jest.fn().mockResolvedValue({
                            id: 'e634870e-5378-432d-85b6-a0af105dde55',
                            stockAmount: 13
                        })
                    }
                }

                const mockStoreCatalogFacade = () => {
                    return {
                        find: jest.fn().mockRejectedValue(new Error(productError)),
                        findAll: jest.fn()
                    }
                }

                const useCaseProperties = {
                    clientAdminFacade: mockClientAdminFacade(),
                    productAdminFacade: mockProductAdminFacade(),
                    storeCatalogFacade: mockStoreCatalogFacade(),
                }

                const useCaseInput = {
                    clientId: '208a9b9e-c0a9-418b-9763-3d6cfcc8904c',
                    products: [
                        {
                            productId: 'e634870e-5378-432d-85b6-a0af105dde55'
                        }
                    ]
                };

                const useCase = new PlaceOrderUseCase(useCaseProperties);
                await useCase.execute(useCaseInput);    
            }).rejects.toThrow(productError);
        });
    });
});
