import { ProductGateway } from "../../domain/Product/Gateway/product.gateway";
import { UseCase } from "../usecase";
import { ProductNotFoundError } from "./Exceptions/ProductNotFound.exception";

export type removeProductRequest = {
  id: string
}

export type removeProductResponse = {}

export class RemoveProductUseCase implements UseCase<removeProductRequest, removeProductResponse> {

  private constructor(private readonly productGateway: ProductGateway) { }

  public static create(productGateway: ProductGateway) {
    return new RemoveProductUseCase(productGateway)
  }

  async execute({ id }: removeProductRequest): Promise<removeProductResponse> {

    const findProduct = await this.productGateway.findById(id)

    if (!findProduct) {
      throw new ProductNotFoundError()
    }

    await this.productGateway.remove(findProduct.id)

    return 'Produto removido com sucesso'

  }
}