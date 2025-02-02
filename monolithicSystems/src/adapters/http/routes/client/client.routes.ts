import express from 'express';
import { httpStatusCodes } from '../routes';
import {Request, Response} from 'express';
import ClientAdminFacadeFactory from '../../../../modules/clientAdmin/factory/clientAdmin.facade.factory';

export const clientRouter = express.Router();

clientRouter.post('/', async(req: Request, res: Response) => {
    try {
        const name = req.body['name'].toString();
        const document = req.body['document'].toString();
        const email = req.body['email'].toString();
        const street = req.body['street'].toString();
        const number = req.body['number'].toString();
        const complement = req.body['complement'].toString();
        const city = req.body['city'].toString();
        const state = req.body['state'].toString();
        const zipCode = req.body['zipCode'].toString();

        const clientAdminFacadeFactory = new ClientAdminFacadeFactory();
        const clientAdminFacade = clientAdminFacadeFactory.make();

        const input = {
            name: name,
            document: document,
            email: email,
            street: street,
            number: number,
            complement: complement,
            city: city,
            state: state,
            zipCode: zipCode,
        };

        const output = await clientAdminFacade.add(input);

        res.status(httpStatusCodes.created).send(output);
    } catch (error) {
        if (error instanceof Error) {
            res.status(httpStatusCodes.internalServerError).send({error: error.message});
        }
    }
});

clientRouter.get('/', async(req: Request, res: Response) => {
    try {
        const id = req.query['id'].toString();

        const clientAdminFacadeFactory = new ClientAdminFacadeFactory();
        const clientAdminFacade = clientAdminFacadeFactory.make();

        const input = {
            id: id,
        };

        const output = await clientAdminFacade.find(input);

        res.status(httpStatusCodes.ok).send(output);
    } catch (error) {
        if (error instanceof Error) {
            res.status(httpStatusCodes.internalServerError).send({error: error.message});
        }
    }
});