import { Request, Response } from "express";
import { RemoveProductUseCase } from "../../../../../usecases/Product/remove-product.usecase";
import { HttpMethod, Route } from "../route";
import { ProductNotFoundError } from "../../../../../usecases/Product/Exceptions/ProductNotFound.exception";

export class RemoveProductApiExpress implements Route {

  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly removeProductUseCase: RemoveProductUseCase
  ) { }

  public static create(removeProductUseCase: RemoveProductUseCase) {
    return new RemoveProductApiExpress(
      `/product/remove/:id`,
      'delete',
      removeProductUseCase
    )
  }

  public getMethod(): HttpMethod {
    return this.method
  }

  public getPath(): string {
    return this.path
  }

  public getHandler(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {

      try {
        const { id } = req.params

        if (typeof id !== 'string') {
          res.status(400).json({ message: 'Id inválido' })
          return
        }

        await this.removeProductUseCase.execute({ id })

        res.status(200).json({ message: 'Produto removido com sucesso' })

      } catch (error) {

        if (error instanceof ProductNotFoundError) {
          res.status(404).json({ message: error.message })
          return
        }

        res.status(500).json({ message: 'Erro interno' })
      }
    }
  }

}