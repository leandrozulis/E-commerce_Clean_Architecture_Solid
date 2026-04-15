import type { ProductEntity } from "../Entity/product.entity";

export interface ProductGateway {
  save(product: ProductEntity): Promise<void>
}