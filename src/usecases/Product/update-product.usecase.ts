import { ProductGateway } from "../../domain/Product/Gateway/product.gateway";
import { UseCase } from "../usecase";
import { ProductNotFoundError } from "./Exceptions/ProductNotFound.exception";

export type UpdateProductRequest = {
  id: string
  name: string;
  unitPrice: number;
  promotionalPrice: number;
  shortDescription: string;
  longDescription: string;
  category: string;
  quantityStock: number;
}

export type UpdateProductResponse = {
  product: {
    id: string
  }
}

export class UpdateProductUseCase implements UseCase<UpdateProductRequest, UpdateProductResponse> {

  private constructor(private productGateway: ProductGateway) { }

  public static create(productGateway: ProductGateway) {
    return new UpdateProductUseCase(productGateway)
  }

  public async execute({
    id,
    name,
    unitPrice,
    promotionalPrice,
    shortDescription,
    longDescription,
    category,
    quantityStock
  }: UpdateProductRequest): Promise<UpdateProductResponse> {

    const findProduct = await this.productGateway.findById(id)

    if (!findProduct) {
      throw new ProductNotFoundError()
    }

    const updateProduct = {
      id: findProduct.id,
      name: name ?? findProduct.name,
      unitPrice: unitPrice ?? findProduct.unitPrice,
      promotionalPrice: promotionalPrice ?? findProduct.promotionalPrice,
      shortDescription: shortDescription ?? findProduct.shortDescription,
      longDescription: longDescription ?? findProduct.longDescription,
      category: category ?? findProduct.category,
      quantityBuy: findProduct.quantityBuy ?? 0,
      favorite: findProduct.favorite ?? false,
      quantityStock: quantityStock ?? findProduct.quantityStock,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    await this.productGateway.update(
      findProduct.id, updateProduct
    )

    return {
      product: {
        id: updateProduct.id
      }
    }

  }
}