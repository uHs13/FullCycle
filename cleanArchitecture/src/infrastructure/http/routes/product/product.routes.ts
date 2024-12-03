import express from 'express';
import {Request, Response} from "express";
import { httpStatusCodes } from '../routes';
import ProductRepository from '../../../product/repository/sequelize/product.repository';
import CreateProductUseCase from '../../../../domain/useCase/product/create/create.product.usecase';
import UuidGenerator from '../../../uuid/uuid.generator';
import FindProductUseCase from '../../../../domain/useCase/product/find/find.product.usecase';
import ListProductUseCase from '../../../../domain/useCase/product/list/list.product.usecase';
import UpdateProductUseCase from '../../../../domain/useCase/product/update/update.product.usecase';

export const productRouter = express.Router();

productRouter.post("/", async (req: Request, res: Response) => {
    try {
        const productRepository = new ProductRepository();
        const useCase = new CreateProductUseCase(productRepository);

        const input = {
            name: req.body.name,
            price: req.body.price,
            uuidGenerator: new UuidGenerator(),
        };

        const output = await useCase.execute(input);

        res.status(httpStatusCodes.created).send(output);
    } catch (error) {
        if (error instanceof Error) {
            res.status(httpStatusCodes.internalServerError).send({error: error.message});
        }
    }
});

productRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const productId = req.params["id"];

        const productRepository = new ProductRepository();
        const useCase = new FindProductUseCase(productRepository);

        const input = {id: productId};

        const output = await useCase.execute(input);

        res.status(httpStatusCodes.ok).send(output);
    } catch (error) {
        if (error instanceof Error) {
            res.status(httpStatusCodes.internalServerError).send({error: error.message});
        }
    }
});

productRouter.get("/", async (req: Request, res: Response) => {
    try {
        const productRepository = new ProductRepository();
        const useCase = new ListProductUseCase(productRepository);

        const output = await useCase.execute({});

        res.status(httpStatusCodes.ok).send(output);
    } catch (error) {
        if (error instanceof Error) {
            res.status(httpStatusCodes.internalServerError).send({error: error.message});
        }
    }
});

productRouter.put("/:id", async (req: Request, res: Response) => {
    try {
        const productId = req.params["id"];

        const productRepository = new ProductRepository();
        const useCase = new UpdateProductUseCase(productRepository);

        const input = {
            id: productId,
            name: req.body.name,
            price: req.body.price,
        };

        const output = await useCase.execute(input);

        res.status(httpStatusCodes.ok).send(output);
    } catch (error) {
        if (error instanceof Error) {
            res.status(httpStatusCodes.internalServerError).send({error: error.message});
        }
    }
});
