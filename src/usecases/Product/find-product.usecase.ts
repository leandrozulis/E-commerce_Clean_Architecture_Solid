import { ProductEntity } from "../../domain/Product/Entity/product.entity";
import { ProductGateway } from "../../domain/Product/Gateway/product.gateway";
import { UseCase } from "../usecase";
import { ProductNotFoundError } from "./Exceptions/ProductNotFound.exception";

export type FindProductRequest = {
  id: string
}

export type FindProductResponse = {
  product: {
    id: string,
    name: string,
    unitPrice: number,
    promotionalPrice: number | null,
    shortDescription: string,
    longDescription: string,
    category: string,
    quantityStock: number,
    favorite: boolean
  }
}

export class FindProductUseCase implements UseCase<FindProductRequest, FindProductResponse> {

  private constructor(private productGateway: ProductGateway) { }

  public static create(productGateway: ProductGateway) {
    return new FindProductUseCase(productGateway)
  }

  public async execute({ id }: FindProductRequest): Promise<FindProductResponse> {

    const findProduct = await this.productGateway.findById(id)

    if (!findProduct) {
      throw new ProductNotFoundError()
    }

    return this.present(findProduct)

  }

  private present(product: ProductEntity): FindProductResponse {
    return {
      product: {
        id: product.id,
        name: product.name,
        unitPrice: product.unitPrice,
        promotionalPrice: product.promotionalPrice,
        shortDescription: product.shortDescription,
        longDescription: product.longDescription,
        category: product.category,
        quantityStock: product.quantityStock,
        favorite: product.favorite
      }
    }
  }

}