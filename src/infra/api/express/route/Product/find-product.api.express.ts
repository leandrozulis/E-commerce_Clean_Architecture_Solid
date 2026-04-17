import { Request, Response } from "express";
import { FindProductUseCase } from "../../../../../usecases/Product/find-product.usecase";
import { HttpMethod, Route } from "../route";
import { ProductNotFoundError } from "../../../../../usecases/Product/Exceptions/ProductNotFound.exception";

export class FindProductApiExpress implements Route {

  private constructor(
    private readonly findProductUseCase: FindProductUseCase,
    private readonly method: HttpMethod,
    private readonly path: string
  ) { }

  public static create(findProductUseCase: FindProductUseCase) {
    return new FindProductApiExpress(
      findProductUseCase,
      "get",
      "/product/find/:id"
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

        const aProduct = await this.findProductUseCase.execute({ id })

        res.status(200).json(aProduct)
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