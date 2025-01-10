import Invoice from "../domain/invoice";

export default interface GatewayInterface {
    generate(invoice: Invoice): Promise<Invoice>;
    find(id: string): Promise<Invoice>;
}
