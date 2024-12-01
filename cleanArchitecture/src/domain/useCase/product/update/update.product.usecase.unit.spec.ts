import UuidGenerator from "../../../../infrastructure/uuid/uuid.generator";
import Product from "../../../product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

describe('Update product use case unit tests', () => {
   const name = 'Black and White T-shirt';
   const price = 13;

   const product = new Product((new UuidGenerator()).generate(), name, price);

   const input = {
      id: product.id,
      name: product.name,
      price: product.price,
   };

   const mockProductRepository = () => {
      return {
         create: jest.fn(),
         update: jest.fn(),
         find: jest.fn().mockReturnValue(Promise.resolve(product)),
         findAll: jest.fn(),
      };
   };

   it('Should properly update a product', async () => {
      const productRepository = mockProductRepository();
      const useCase = new UpdateProductUseCase(productRepository);

      const output = await useCase.execute(input);

      expect(output).toStrictEqual(input);
   });

   it('Should throw an error when product was not found', async () => {
      const errorMessage = 'Was not possible to find the product';

      expect(async () => {
         const mockProductRepository = () => {
            return {
               create: jest.fn(),
               update: jest.fn(),
               find: jest.fn().mockRejectedValue(new Error(errorMessage)),
               findAll: jest.fn(),
            };
         }

         const productRepository = mockProductRepository();
         const useCase = new UpdateProductUseCase(productRepository);

         await useCase.execute(input);
      }).rejects.toThrow(errorMessage);
   });

   it('Should throw an error when name is not valid', async () => {
      expect(async () => {
         const productRepository = mockProductRepository();
         const useCase = new UpdateProductUseCase(productRepository);

         const input = {
            id: product.id,
            name: '',
            price: price,
            uuidGenerator: new UuidGenerator(),
         };

         await useCase.execute(input);
      }).rejects.toThrow('The name is required');
   });

   it('Should throw an error when price is not valid', async () => {
      expect(async () => {
         const productRepository = mockProductRepository();
         const useCase = new UpdateProductUseCase(productRepository);

         const input = {
            id: product.id,
            name: name,
            price: -13,
            uuidGenerator: new UuidGenerator(),
         };

         await useCase.execute(input);
      }).rejects.toThrow('The price must be greater or equal to zero');
   });
});
