import express from 'express';
import { httpStatusCodes } from '../routes';
import {Request, Response} from 'express';
import ProductAdminFacadeFactory from '../../../../modules/productAdmin/factory/productAdmin.facade.factory';
import StoreCatalogFacadeFactory from '../../../../modules/storeCatalog/factory/storeCatalog.facade.factory';

export const productRouter = express.Router();

productRouter.post('/', async(req: Request, res: Response) => {
    try {
        const name = req.body['name'].toString();
        const description = req.body['description'].toString();
        const purchasePrice = Number(req.body['purchasePrice']);
        const stockAmount = Number(req.body['stockAmount']);

        const productAdminFacadeFactory = new ProductAdminFacadeFactory();
        const productAdminFacade = productAdminFacadeFactory.make();

        const input = {
            name: name,
            description: description,
            purchasePrice: purchasePrice,
            stockAmount: stockAmount
        };

        const output = await productAdminFacade.addProduct(input);

        res.status(httpStatusCodes.created).send(output);
    } catch (error) {
        if (error instanceof Error) {
            res.status(httpStatusCodes.internalServerError).send({error: error.message});
        }
    }
});

productRouter.get('/stockAmount', async(req: Request, res: Response) => {
    try {
        const id: string = req.query['id'].toString();

        const productAdminFacadeFactory = new ProductAdminFacadeFactory();
        const productAdminFacade = productAdminFacadeFactory.make();

        const input = {
            id: id
        };

        const output = await productAdminFacade.checkProductStockAmount(input);

        res.status(httpStatusCodes.ok).send(output);
    } catch (error) {
        if (error instanceof Error) {
            res.status(httpStatusCodes.internalServerError).send({error: error.message});
        }
    }
});

productRouter.get('/', async(req: Request, res: Response) => {
    try {
        const id: string = req.query['id'].toString();

        const storeCatalogFacadeFactory = new StoreCatalogFacadeFactory();
        const storeCatalogFacade = storeCatalogFacadeFactory.make();

        const input = {
            id: id
        };

        const output = await storeCatalogFacade.find(input);

        res.status(httpStatusCodes.ok).send({
            id: output.id,
            name: output.name,
            description: output.description
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(httpStatusCodes.internalServerError).send({error: error.message});
        }
    }
});

productRouter.get('/all', async(req: Request, res: Response) => {
    try {
        const storeCatalogFacadeFactory = new StoreCatalogFacadeFactory();
        const storeCatalogFacade = storeCatalogFacadeFactory.make();

        const output = await storeCatalogFacade.findAll();

        res.status(httpStatusCodes.ok).send(output);
    } catch (error) {
        if (error instanceof Error) {
            res.status(httpStatusCodes.internalServerError).send({error: error.message});
        }
    }
});
