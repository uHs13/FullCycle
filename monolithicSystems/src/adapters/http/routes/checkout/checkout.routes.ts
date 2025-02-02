import express from 'express';
import {Request, Response} from 'express';
import { httpStatusCodes } from "../routes";
import CheckoutFacadeFactory from '../../../../modules/checkout/factory/checkout.facade.factory';

export const checkoutRouter = express.Router();

checkoutRouter.post('/', async(req: Request, res: Response) => {
    try {
        const checkoutFacadeFactory = new CheckoutFacadeFactory();
        const checkoutFacade = checkoutFacadeFactory.make();

        const input = req.body;

        const output = await checkoutFacade.placeOrder(input);

        res.status(httpStatusCodes.created).send(output);
    } catch (error) {
        if (error instanceof Error) {
            res.status(httpStatusCodes.internalServerError).send({error: error.message});
        }
    }
});
