import CreateCustomerUseCase from "../../../../domain/useCase/customer/create/create.customer.usecase";
import FindCustomerUseCase from "../../../../domain/useCase/customer/find/find.customer.usecase";
import ListCustomerUseCase from "../../../../domain/useCase/customer/list/list.customer.usecase";
import UpdateCustomerUseCase from "../../../../domain/useCase/customer/update/update.customer.usecase";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import UuidGenerator from "../../../uuid/uuid.generator";
import {httpStatusCodes} from "../routes";
import {Request, Response} from "express";
import express from "express";

export const customerRouter = express.Router();

customerRouter.post("/", async (req: Request, res: Response) => {
    try {
        const customerRepository = new CustomerRepository();
        const useCase = new CreateCustomerUseCase(customerRepository);

        const input = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                zipCode: req.body.address.zipCode,
                city: req.body.address.city,
            },
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

customerRouter.get("/", async (req: Request, res: Response) => {
    try {
        const customerRepository = new CustomerRepository();
        const useCase = new ListCustomerUseCase(customerRepository);

        const output = await useCase.execute({});

        res.status(httpStatusCodes.ok).send(output);
    } catch (error) {
        if (error instanceof Error) {
            res.status(httpStatusCodes.internalServerError).send({error: error.message});
        }
    }
});

customerRouter.put("/:id", async (req: Request, res: Response) => {
    try {
        const customerId = req.params["id"];

        const customerRepository = new CustomerRepository();
        const useCase = new UpdateCustomerUseCase(customerRepository);

        const input = {
            id: customerId,
            name: req.body.name,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                zipCode: req.body.address.zipCode,
                city: req.body.address.city,
            },
        };

        const output = await useCase.execute(input);

        res.status(httpStatusCodes.ok).send(output);
    } catch (error) {
        if (error instanceof Error) {
            res.status(httpStatusCodes.internalServerError).send({error: error.message});
        }
    }
});

customerRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const customerId = req.params["id"];

        const customerRepository = new CustomerRepository();
        const useCase = new FindCustomerUseCase(customerRepository);

        const input = {id: customerId};

        const output = await useCase.execute(input);

        res.status(httpStatusCodes.ok).send(output);
    } catch (error) {
        if (error instanceof Error) {
            res.status(httpStatusCodes.internalServerError).send({error: error.message});
        }
    }
});
