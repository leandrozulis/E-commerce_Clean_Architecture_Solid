
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

  public async findById(id: string): Promise<ProductEntity | null> {

    const findId = await this.prismaClient.product.findFirst({
      where: { id }
    })

    if (!findId) {
      return null
    }

    if (!findId.name) {
      throw new Error('Produto inválido: nome não pode ser nulo')
    }

    const product = ProductEntity.with({
      id: findId.id,
      name: findId.name ?? '',
      unitPrice: findId.unitPrice ?? 0,
      promotionalPrice: findId.promotionalPrice,
      shortDescription: findId.shortDescription ?? '',
      longDescription: findId.longDescription ?? '',
      category: findId.category ?? '',
      quantityStock: findId.quantityStock ?? 0,
      quantityBuy: findId.quantityBuy ?? 0,
      favorite: findId.favorite,
      createdAt: new Date()
    })

    return product

  }

  public async list(): Promise<ProductEntity[]> {

    const listAll = await this.prismaClient.product.findMany()

    const productList = listAll.map((p) => {
      const product = ProductEntity.with({
        id: p.id,
        name: p.name ?? '',
        unitPrice: p.unitPrice ?? 0,
        promotionalPrice: p.promotionalPrice,
        shortDescription: p.shortDescription ?? '',
        longDescription: p.longDescription ?? '',
        category: p.category ?? '',
        quantityStock: p.quantityStock ?? 0,
        quantityBuy: p.quantityBuy ?? 0,
        favorite: p.favorite,
        createdAt: new Date()
      })

      return product
    })

    return productList

  }

  public async remove(id: string): Promise<void> {
    const findId = await this.prismaClient.product.findFirst({
      where: { id }
    })

    if (!findId) {
      return
    }

    await this.prismaClient.product.delete({
      where: {
        id: findId.id
      }
    })
  }

}