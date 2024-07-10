export default class OrderItem {
    private _id: string;
    private _productId: string;
    private _productQuantity: number;
    private _productSalePrice: number;
    private _total: number = 0;

    constructor(
        id: string,
        productId: string,
        productQuantity: number,
        productSalePrice: number
    ) {
        this._id = id;
        this._productId = productId;
        this._productQuantity = productQuantity;
        this._productSalePrice = productSalePrice;

        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get productQuantity(): number {
        return this._productQuantity;
    }

    get productSalePrice(): number {
        return this._productSalePrice;
    }

    get total(): number {
        return this._total;
    }

    validate(): void {
        if (this._id.length === 0) {
            throw new Error('The id is required');
        }

        if (this._productId.length === 0) {
            throw new Error('The product id is required');
        }

        if (this._productQuantity <= 0) {
            throw new Error('The product quantity must be greater than zero');
        }

        if (this._productSalePrice < 0) {
            throw new Error('The product sale price must be greater or equal to zero');
        }
    }

    calculateTotal(): void {
        this._total = this._productQuantity * this._productSalePrice;
    }

    changeProductQuantity(productQuantity: number): void {
        this._productQuantity = productQuantity;

        this.validate();
    }

    changeProductSalePrice(productSalePrice: number): void {
        this._productSalePrice = productSalePrice;

        this.validate();
    }
}
