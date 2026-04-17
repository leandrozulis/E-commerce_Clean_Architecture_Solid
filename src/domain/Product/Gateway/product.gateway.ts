import type { ProductEntity, ProductSchema } from "../Entity/product.entity";

export interface ProductGateway {
  save(product: ProductEntity): Promise<void>
  findById(id: string): Promise<ProductEntity | null>
  list(): Promise<ProductEntity[]>
  remove(id: string): Promise<void>
  update(id: string, data: ProductSchema): Promise<ProductEntity>
}