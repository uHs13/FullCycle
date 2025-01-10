import ItemsTotalCalculatorService from "../../domain/service/items.total.calculator.service";

export interface FindInvoiceUseCaseInputDto {
    id: string;
    calculatorService: ItemsTotalCalculatorService
}

export interface FindInvoiceUseCaseOutputDto {
    id: string;
    name: string;
    document: string;
    address: {
        street: string;
        number: string;
        complement: string;
        city: string;
        state: string;
        zipCode: string;
    };
    items: {
        id: string;
        name: string;
        price: number;
    }[];
    total: number;
    createdAt: Date;
}
