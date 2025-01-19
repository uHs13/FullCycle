import Uuid from "../../../@shared/domain/valueObject/uuid.value.object";
import UseCaseInterface from "../../../@shared/useCase/useCase.interface";
import { ClientAdminFacadeInterface } from "../../../clientAdmin/facade/clientAdmin.facade.interface";
import ProductAdminFacadeInterface from "../../../productAdmin/facade/productAdmin.facade.interface";
import StoreCatalogFacadeInterface from "../../../storeCatalog/facade/storeCatalog.facade.interface";
import Client from "../../domain/client.entity";
import Product from "../../domain/product.entity";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./placeOrder.dto";

type PlaceOrderUseCaseProperties = {
    clientAdminFacade: ClientAdminFacadeInterface,
    productAdminFacade: ProductAdminFacadeInterface,
    storeCatalogFacade: StoreCatalogFacadeInterface,
}

export default class PlaceOrderUseCase implements UseCaseInterface {
    private clientAdminFacade: ClientAdminFacadeInterface;
    private productAdminFacade: ProductAdminFacadeInterface;
    private storeCatalogFacade: StoreCatalogFacadeInterface;

    private input: PlaceOrderInputDto;
    private client: Client;
    private products: Product[];

    private clientNotFoundError: string = 'Client not found';
    private invalidProductIdError: string = 'Invalid product id';
    private productOutofStockError: string = 'Product out of stock';

    private zeroValue: number = 0;

    constructor(input: PlaceOrderUseCaseProperties) {
        this.clientAdminFacade = input.clientAdminFacade;
        this.productAdminFacade = input.productAdminFacade;
        this.storeCatalogFacade = input.storeCatalogFacade;
    }

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
        try {
            this.input = input;

            await this.findClient();
            await this.validateProducts();
            await this.loadProducts();

            return {
                id: '',
                invoiceId: '',
                status: '',
                total: 0,
                products: []
            }
        } catch (error) {
            throw error;
        }
    }

    private async findClient(): Promise<void> {
        try {
            const clientProperties = await this.clientAdminFacade.find({id: this.input.clientId});

            if (!clientProperties) {
                throw new Error(this.clientNotFoundError);
            }

            this.client = new Client({
                name: clientProperties.name,
                email: clientProperties.email,
                address: clientProperties.address,
            });
        } catch (error) {
            throw error;
        }
    }

    private async validateProducts(): Promise<void> {
        this.checkProductsIds();
        await this.checkProductsStock();
    }

    private checkProductsIds(): void {
        this.input.products.forEach(product => {
            if (product.productId.length === this.zeroValue) {
                throw new Error(this.invalidProductIdError);
            }
        });
    }

    private async checkProductsStock(): Promise<void> {
        for (const product of this.input.products) {
            const productStockInfo = await this
                .productAdminFacade
                .checkProductStockAmount({id: product.productId})
            ;

            if (productStockInfo.stockAmount === this.zeroValue) {
                throw new Error(this.productOutofStockError);
            }
        }
    }

    private async loadProducts(): Promise<void> {
        for (const product of this.input.products) {
            const foundProduct = await this
                .storeCatalogFacade
                .find({id: product.productId})
            ;

            this.products.push(new Product({
                id: new Uuid(foundProduct.id),
                name: foundProduct.name,
                description: foundProduct.description,
                purchasePrice: foundProduct.sellingPrice,
            }));
        }
    }
}
