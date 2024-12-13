import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import * as yup from "yup";

export default class ProductYupValidator implements ValidatorInterface<Product> {
    validate(product: Product): void {
        try {
            yup
                .object()
                .shape({
                    id: yup.string().required('The id is required'),
                    name: yup.string().required('The name is required'),
                    price: yup.number().min(0, 'The price must be greater or equal to zero'),
                })
                .validateSync({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                }, {abortEarly: false})
            ;
        } catch (error) {
            const err = error as yup.ValidationError;

            err.errors.forEach(error => {
                product.notification.addError({
                    context: product.errorContext,
                    message: error,
                })
            });

            product.throwErrors();
        }
    }
}
