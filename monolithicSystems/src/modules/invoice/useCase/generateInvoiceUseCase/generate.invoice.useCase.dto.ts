import ItemsTotalCalculatorService from "../../domain/service/items.total.calculator.service";

export interface GenerateInvoiceUseCaseInputDto {
    name: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    items: {
        id: string;
        name: string;
        price: number;
    }[];
    calculatorService: ItemsTotalCalculatorService
}

export interface GenerateInvoiceUseCaseOutputDto {
    id: string;
    name: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    items: {
        id: string;
        name: string;
        price: number;
    }[];
    total: number;
}