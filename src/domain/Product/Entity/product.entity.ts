export type ProductSchema = {
  id: string;
  name: string;
  unitPrice: number;
  promotionalPrice: number | null;
  shortDescription: string;
  longDescription: string;
  category: string;
  quantityStock: number;
  quantityBuy: number;
  favorite: boolean;
  createdAt: Date;
  updatedAt?: Date | undefined;
}

export class ProductEntity {
  private constructor(private props: ProductSchema) { }

  public static create(
    name: string,
    unitPrice: number = 0,
    promotionalPrice: number | null = null,
    shortDescription: string,
    longDescription: string,
    category: string = '',
    quantityStock: number = 0,
    favorite: boolean = false
  ) {
    return new ProductEntity({
      id: crypto.randomUUID().toString(),
      name,
      unitPrice,
      promotionalPrice,
      shortDescription,
      longDescription,
      category,
      quantityStock,
      quantityBuy: 0,
      favorite,
      createdAt: new Date(),
      updatedAt: undefined
    });
  }

  // public static update({
  //   unitPrice,
  //   promotionalPrice,
  //   quantityStock,
  //   quantityBuy,
  //   favorite
  // }: Partial<ProductSchema>): ProductSchema {
  //   unitPrice = unitPrice ?? this.props.unitPrice;
  //   this.props.promotionalPrice = promotionalPrice ?? this.props.promotionalPrice;
  //   this.props.quantityStock = quantityStock ?? this.props.quantityStock;
  //   this.props.quantityBuy = quantityBuy ?? this.props.quantityBuy;
  //   this.props.favorite = favorite ?? this.props.favorite;
  //   this.props.updatedAt = new Date();
  // }

  public static with(props: ProductSchema) {
    return new ProductEntity(props);
  }

  public incrementQuantityBuy(quantity: number) {
    if (
      this.props.quantityStock >= quantity &&
      quantity > 0
    ) {
      this.props.quantityStock -= quantity
      this.props.quantityBuy += quantity
    }
  }

  public incrementQuantityStock(quantity: number) {
    if (quantity >= 0) {
      this.props.quantityStock += quantity
    }
  }

  public decrementQuantityStock(quantity: number) {

    let validateQuantyStockWithDecrement =
      (this.props.quantityStock - quantity) >= 0 ?
        true : false

    if (
      validateQuantyStockWithDecrement &&
      quantity > 0
    ) {
      this.props.quantityStock -= quantity
    }
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get unitPrice(): number {
    return this.props.unitPrice;
  }

  get promotionalPrice(): number | null {
    return this.props.promotionalPrice;
  }

  get shortDescription(): string {
    return this.props.shortDescription;
  }

  get longDescription(): string {
    return this.props.longDescription;
  }

  get category(): string {
    return this.props.category;
  }

  get quantityStock(): number {
    return this.props.quantityStock;
  }

  get quantityBuy(): number {
    return this.props.quantityBuy;
  }

  get favorite(): boolean {
    return this.props.favorite;
  }
}