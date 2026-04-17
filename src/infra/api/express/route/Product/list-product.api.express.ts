import { Request, Response } from "express";
import { ListProductUseCase } from "../../../../../usecases/Product/list-product.usecase";
import { HttpMethod, Route } from "../route";

export class ListProductApiExpress implements Route {

  private constructor(
    private readonly listProductUseCase: ListProductUseCase,
    private readonly method: HttpMethod,
    private readonly path: string
  ) { }

  public static create(listProductUseCase: ListProductUseCase) {
    return new ListProductApiExpress(
      listProductUseCase,
      "get",
      "/product/list"
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
        const aProducts = await this.listProductUseCase.execute()

        res.status(200).json(aProducts)
      } catch (error) {
        res.status(500).json({ message: 'Erro interno' })
      }
    }
  }

}