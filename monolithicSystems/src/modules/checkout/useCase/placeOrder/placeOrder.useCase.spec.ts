import Uuid from "../../../@shared/domain/valueObject/uuid.value.object";
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

            const mockPaymentFacade = () => {
                return {
                    save: jest.fn().mockRejectedValue(new Error('productError'))
                }
            };

            const mockInvoiceFacade = () => {
                return {
                    generate: jest.fn(),
                    find: jest.fn(),
                }
            }

            const mockRepository = () => {
                return {
                    addOrder: jest.fn(),
                    findOrder: jest.fn(),
                }
            }

            const useCaseProperties = {
                clientAdminFacade: mockClientAdminFacade(),
                productAdminFacade: mockProductAdminFacade(),
                storeCatalogFacade: mockStoreCatalogFacade(),
                paymentFacade: mockPaymentFacade(),
                invoiceFacade: mockInvoiceFacade(),
                repository: mockRepository(),
            };

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

            const mockPaymentFacade = () => {
                return {
                    save: jest.fn().mockRejectedValue(new Error('productError'))
                }
            };

            const mockInvoiceFacade = () => {
                return {
                    generate: jest.fn(),
                    find: jest.fn(),
                }
            }

            const mockRepository = () => {
                return {
                    addOrder: jest.fn(),
                    findOrder: jest.fn(),
                }
            }

            const useCaseProperties = {
                clientAdminFacade: mockClientAdminFacade(),
                productAdminFacade: mockProductAdminFacade(),
                storeCatalogFacade: mockStoreCatalogFacade(),
                paymentFacade: mockPaymentFacade(),
                invoiceFacade: mockInvoiceFacade(),
                repository: mockRepository(),
            };

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

                const mockPaymentFacade = () => {
                    return {
                        save: jest.fn().mockRejectedValue(new Error(productError))
                    }
                };

                const mockInvoiceFacade = () => {
                    return {
                        generate: jest.fn(),
                        find: jest.fn(),
                    }
                }

                const mockRepository = () => {
                    return {
                        addOrder: jest.fn(),
                        findOrder: jest.fn(),
                    }
                }

                const useCaseProperties = {
                    clientAdminFacade: mockClientAdminFacade(),
                    productAdminFacade: mockProductAdminFacade(),
                    storeCatalogFacade: mockStoreCatalogFacade(),
                    paymentFacade: mockPaymentFacade(),
                    invoiceFacade: mockInvoiceFacade(),
                    repository: mockRepository(),
                };

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

                const mockPaymentFacade = () => {
                    return {
                        save: jest.fn().mockRejectedValue(new Error(productError))
                    }
                };

                const mockInvoiceFacade = () => {
                    return {
                        generate: jest.fn(),
                        find: jest.fn(),
                    }
                }

                const mockRepository = () => {
                    return {
                        addOrder: jest.fn(),
                        findOrder: jest.fn(),
                    }
                }

                const useCaseProperties = {
                    clientAdminFacade: mockClientAdminFacade(),
                    productAdminFacade: mockProductAdminFacade(),
                    storeCatalogFacade: mockStoreCatalogFacade(),
                    paymentFacade: mockPaymentFacade(),
                    invoiceFacade: mockInvoiceFacade(),
                    repository: mockRepository(),
                };

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

                const mockPaymentFacade = () => {
                    return {
                        save: jest.fn().mockRejectedValue(new Error(productError))
                    }
                };

                const mockInvoiceFacade = () => {
                    return {
                        generate: jest.fn(),
                        find: jest.fn(),
                    }
                }

                const mockRepository = () => {
                    return {
                        addOrder: jest.fn(),
                        findOrder: jest.fn(),
                    }
                }

                const useCaseProperties = {
                    clientAdminFacade: mockClientAdminFacade(),
                    productAdminFacade: mockProductAdminFacade(),
                    storeCatalogFacade: mockStoreCatalogFacade(),
                    paymentFacade: mockPaymentFacade(),
                    invoiceFacade: mockInvoiceFacade(),
                    repository: mockRepository(),
                };

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

    describe('Process payment unit tests', () => {
        it('Should throw an error when amount is zero', async () => {
            const productError = 'The amount must be greater than zero';

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
                        find: jest.fn().mockReturnValue({
                            id: 'uuid',
                            name: 'name',
                            description: 'description',
                            sellingPrice: 13
                        }),
                        findAll: jest.fn()
                    }
                }

                const mockPaymentFacade = () => {
                    return {
                        save: jest.fn().mockRejectedValue(new Error(productError))
                    }
                };

                const mockInvoiceFacade = () => {
                    return {
                        generate: jest.fn(),
                        find: jest.fn(),
                    }
                }

                const mockRepository = () => {
                    return {
                        addOrder: jest.fn(),
                        findOrder: jest.fn(),
                    }
                }

                const useCaseProperties = {
                    clientAdminFacade: mockClientAdminFacade(),
                    productAdminFacade: mockProductAdminFacade(),
                    storeCatalogFacade: mockStoreCatalogFacade(),
                    paymentFacade: mockPaymentFacade(),
                    invoiceFacade: mockInvoiceFacade(),
                    repository: mockRepository(),
                };

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

        it('Should throw an error when payment is denied', async () => {
            const productError = 'It was not possible to process the payment';

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
                        find: jest.fn().mockReturnValue({
                            id: 'uuid',
                            name: 'name',
                            description: 'description',
                            sellingPrice: 13
                        }),
                        findAll: jest.fn()
                    }
                }

                const mockPaymentFacade = () => {
                    return {
                        save: jest.fn().mockReturnValue({
                            transactionId: new Uuid().value,
                            status: 'denied',
                            amount: 13,
                            orderId: new Uuid().value
                        })
                    }
                };

                const mockInvoiceFacade = () => {
                    return {
                        generate: jest.fn(),
                        find: jest.fn(),
                    }
                }

                const mockRepository = () => {
                    return {
                        addOrder: jest.fn(),
                        findOrder: jest.fn(),
                    }
                }

                const useCaseProperties = {
                    clientAdminFacade: mockClientAdminFacade(),
                    productAdminFacade: mockProductAdminFacade(),
                    storeCatalogFacade: mockStoreCatalogFacade(),
                    paymentFacade: mockPaymentFacade(),
                    invoiceFacade: mockInvoiceFacade(),
                    repository: mockRepository(),
                };

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

    describe('Place order unit tests', () => {
        it('Should properly place an order', async () => {
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
                    find: jest.fn().mockReturnValue({
                        id: 'uuid',
                        name: 'name',
                        description: 'description',
                        sellingPrice: 13
                    }),
                    findAll: jest.fn()
                }
            }

            const mockPaymentFacade = () => {
                return {
                    save: jest.fn().mockReturnValue({
                        transactionId: new Uuid().value,
                        status: 'approved',
                        amount: 13,
                        orderId: new Uuid().value
                    })
                }
            };

            const mockInvoiceFacade = () => {
                return {
                    generate: jest.fn().mockReturnValue({id: '208a9b9e-c0a9-418b-9763-3d6cfcc8904c'}),
                    find: jest.fn(),
                }
            }

            const mockRepository = () => {
                return {
                    addOrder: jest.fn(),
                    findOrder: jest.fn(),
                }
            }

            const useCaseProperties = {
                clientAdminFacade: mockClientAdminFacade(),
                productAdminFacade: mockProductAdminFacade(),
                storeCatalogFacade: mockStoreCatalogFacade(),
                paymentFacade: mockPaymentFacade(),
                invoiceFacade: mockInvoiceFacade(),
                repository: mockRepository(),
            };

            const useCaseInput = {
                clientId: '208a9b9e-c0a9-418b-9763-3d6cfcc8904c',
                products: [
                    {
                        productId: 'e634870e-5378-432d-85b6-a0af105dde55'
                    }
                ]
            };

            const useCase = new PlaceOrderUseCase(useCaseProperties);
            const output = await useCase.execute(useCaseInput);

            expect(output.id).toBeDefined();
            expect(output.invoiceId).toEqual('208a9b9e-c0a9-418b-9763-3d6cfcc8904c');
            expect(output.status).toEqual('approved');
            expect(output.total).toEqual(13);
            expect(output.products[0].productId).toEqual('uuid');
        })
    });
});
