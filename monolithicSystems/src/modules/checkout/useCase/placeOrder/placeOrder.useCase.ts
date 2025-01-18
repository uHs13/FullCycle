import UseCaseInterface from "../../../@shared/useCase/useCase.interface";
import { ClientAdminFacadeInterface } from "../../../clientAdmin/facade/clientAdmin.facade.interface";
import Client from "../../domain/client.entity";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./placeOrder.dto";

type PlaceOrderUseCaseProperties = {
    clientAdminFacade: ClientAdminFacadeInterface
}

export default class PlaceOrderUseCase implements UseCaseInterface {
    private clientAdminFacade: ClientAdminFacadeInterface;
    private input: PlaceOrderInputDto;
    private client: Client;

    private clientNotFoundError: string = 'Client not found';
    private invalidProductIdError: string = 'Invalid product id';

    constructor(input: PlaceOrderUseCaseProperties) {
        this.clientAdminFacade = input.clientAdminFacade;
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
            if (error instanceof Error) {
                throw new Error(error.message);
            }
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
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }

    private async validateProducts(): Promise<void> {
        try {
            this.input.products.forEach(product => {
                if (product.productId.length === 0) {
                    throw new Error(this.invalidProductIdError);
                }
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }
}
