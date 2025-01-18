import UseCaseInterface from "../../../@shared/useCase/useCase.interface";
import { ClientAdminFacadeInterface } from "../../../clientAdmin/facade/clientAdmin.facade.interface";
import ProductAdminFacadeInterface from "../../../productAdmin/facade/productAdmin.facade.interface";
import Client from "../../domain/client.entity";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./placeOrder.dto";

type PlaceOrderUseCaseProperties = {
    clientAdminFacade: ClientAdminFacadeInterface,
    productAdminFacade: ProductAdminFacadeInterface,
}

export default class PlaceOrderUseCase implements UseCaseInterface {
    private clientAdminFacade: ClientAdminFacadeInterface;
    private productAdminFacade: ProductAdminFacadeInterface;
    private input: PlaceOrderInputDto;
    private client: Client;

    private clientNotFoundError: string = 'Client not found';
    private invalidProductIdError: string = 'Invalid product id';
    private productOutofStockError: string = 'Product out of stock';

    private zeroValue: number = 0;

    constructor(input: PlaceOrderUseCaseProperties) {
        this.clientAdminFacade = input.clientAdminFacade;
        this.productAdminFacade = input.productAdminFacade;
    }

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
        try {
            this.input = input;

            await this.findClient();
            await this.validateProducts();

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
}
