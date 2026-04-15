import type { Request, Response } from "express";
import type { HttpMethod, Route } from "../route";
import type { createProductRequest, createProductResponse, CreateProductUseCase } from "../../../../../usecases/Product/create-product.usecase";

export class CreateProductApiExpress implements Route {

  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createProductUseCase: CreateProductUseCase
  ) { }

  public static create(createProductUseCase: CreateProductUseCase) {
    return new CreateProductApiExpress(
      '/product/create',
      'post',
      createProductUseCase
    )
  }


  public getHandler(): (req: Request, res: Response) => Promise<void> {

    return async (req: Request, res: Response) => {

      const {
        name,
        unitPrice,
        promotionalPrice,
        shortDescription,
        longDescription,
        category,
        quantityStock
      } = req.body

      const input: createProductRequest = {
        name,
        unitPrice,
        promotionalPrice,
        shortDescription,
        longDescription,
        category,
        quantityStock
      }

      const output = await this.createProductUseCase.execute(input)

      const responseBody = this.present(output)

      res.status(201).json(responseBody).send()

    }

  }

  private present(input: createProductResponse): createProductResponse {
    const output: createProductResponse = {
      id: input.id
    }

    return output
  }

  public getMethod(): HttpMethod {
    return this.method
  }

  public getPath(): string {
    return this.path
  }

}