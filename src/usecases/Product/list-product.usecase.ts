import { ProductEntity } from "../../domain/Product/Entity/product.entity";
import { ProductGateway } from "../../domain/Product/Gateway/product.gateway";
import { UseCase } from "../usecase";

export type ListProductRequest = void

export type ListProductResponse = {
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
  }[]
}

export class ListProductUseCase implements UseCase<ListProductRequest, ListProductResponse> {

  private constructor(private productGateway: ProductGateway) { }

  public static create(productGateway: ProductGateway) {
    return new ListProductUseCase(productGateway)
  }

  public async execute(): Promise<ListProductResponse> {

    const listAll = await this.productGateway.list()

    return this.present(listAll)

  }

  private present(products: ProductEntity[]): ListProductResponse {
    return {
      product: products.map(p => {
        return {
          id: p.id,
          name: p.name,
          unitPrice: p.unitPrice,
          promotionalPrice: p.promotionalPrice,
          shortDescription: p.shortDescription,
          longDescription: p.longDescription,
          category: p.category,
          quantityStock: p.quantityStock,
          favorite: p.favorite
        }
      })
    }
  }

}