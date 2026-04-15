
import { ProductEntity } from "../../../domain/Product/Entity/product.entity";
import { ProductGateway } from "../../../domain/Product/Gateway/product.gateway";
import { PrismaClient } from "../../../generated/prisma/client";

export class ProductRepositoryPrisma implements ProductGateway {

  private constructor(private readonly prismaClient: PrismaClient) { }

  public static create(prismaClient: PrismaClient) {
    return new ProductRepositoryPrisma(prismaClient)
  }

  public async save(product: ProductEntity): Promise<void> {
    const data = {
      id: product.id,
      name: product.name,
      unitPrice: product.unitPrice,
      promotionalPrice: product.promotionalPrice,
      shortDescription: product.shortDescription,
      longDescription: product.longDescription,
      category: product.category,
      quantityStock: product.quantityStock,
      quantityBuy: product.quantityBuy,
      favorite: product.favorite
    }

    await this.prismaClient.product.create({ data })
  }

}