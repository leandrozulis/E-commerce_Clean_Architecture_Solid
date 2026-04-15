import { ProductEntity } from "../../domain/Product/Entity/product.entity";
import { ProductGateway } from "../../domain/Product/Gateway/product.gateway";
import { UseCase } from "../usecase";

export type createProductRequest = {
  name: string;
  unitPrice: number;
  promotionalPrice?: number;
  shortDescription: string;
  longDescription: string;
  category?: string;
  quantityStock?: number;
}

export type createProductResponse = {
  id: string
}

export class CreateProductUseCase implements UseCase<createProductRequest, createProductResponse> {

  private constructor(private readonly productGateway: ProductGateway) { }

  public static create(productGateway: ProductGateway) {
    return new CreateProductUseCase(productGateway)
  }

  async execute({
    name,
    unitPrice,
    promotionalPrice,
    shortDescription,
    longDescription,
    category,
    quantityStock
  }: createProductRequest): Promise<createProductResponse> {

    const aProduct = ProductEntity.create(
      name,
      unitPrice,
      promotionalPrice,
      shortDescription,
      longDescription,
      category,
      quantityStock
    )

    await this.productGateway.save(aProduct)

    const output = this.present(aProduct)

    return output

  }

  private present(product: ProductEntity): createProductResponse {
    const output: createProductResponse = {
      id: product.id
    }

    return output
  }
}