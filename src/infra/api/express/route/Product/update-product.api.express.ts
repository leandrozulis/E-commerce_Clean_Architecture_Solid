import { Request, Response } from "express";
import { UpdateProductUseCase } from "../../../../../usecases/Product/update-product.usecase";
import { HttpMethod, Route } from "../route";

export class UpdateProductApiExpress implements Route {

  private constructor(
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly method: HttpMethod,
    private readonly path: string
  ) { }

  public static create(updateProductUseCase: UpdateProductUseCase) {
    return new UpdateProductApiExpress(
      updateProductUseCase,
      'put',
      '/product/update/:id'
    )
  }

  public getMethod(): HttpMethod {
    return this.method;
  }

  public getPath(): string {
    return this.path;
  }

  public getHandler(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const { name, unitPrice, promotionalPrice, shortDescription, longDescription, category, quantityStock } = req.body;

        if (typeof id !== 'string') {
          res.status(400).json({ error: 'Invalid id' })
          return
        }

        const response = await this.updateProductUseCase.execute({
          id,
          name,
          unitPrice,
          promotionalPrice,
          shortDescription,
          longDescription,
          category,
          quantityStock
        });

        res.status(200).json(response);
      } catch (error) {
        res.status(500).json('Erro interno');
      }
    }
  }

}