import express from 'express';
import { httpStatusCodes } from '../routes';
import {Request, Response} from 'express';
import InvoiceFacadeFactory from '../../../../modules/invoice/factory/invoice.facade.factory';

export const invoiceRouter = express.Router();

invoiceRouter.get('/', async(req: Request, res: Response) => {
    try {
        const id = req.query['id'].toString();

        const invoiceFacadeFactory = new InvoiceFacadeFactory();
        const invoiceFacade = invoiceFacadeFactory.make();

        const input = {
            id: id,
        };

        const output = await invoiceFacade.find(input);

        res.status(httpStatusCodes.ok).send(output);
    } catch (error) {
        if (error instanceof Error) {
            res.status(httpStatusCodes.internalServerError).send({error: error.message});
        }
    }
});
