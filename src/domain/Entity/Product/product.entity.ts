type ProductSchema = {
  id: string;
  name: string;
  unitPrice: number;
  promotionalPrice: number | null;
  shortDescription: string;
  longDescription: string;
  category: string;
  variation?: [{ quantity: number; type: string }] | [];
  quantityStock: number;
  quantityBuy: number;
  numberReviews: number;
  favorite: boolean;
  createdAt: Date;
  updatedAt?: Date | undefined;
}

export class ProductEntity {
  private constructor(private props: ProductSchema) { }

  public static create(
    name: string,
    shortDescription: string,
    longDescription: string,
    unitPrice: number = 0,
    promotionalPrice: number | null = null,
    category: string = '',
    variation: [{ quantity: number, type: string }] = [{ quantity: 0, type: '' }],
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
      variation,
      quantityStock: 0,
      quantityBuy: 0,
      numberReviews: 0,
      favorite,
      createdAt: new Date(),
      updatedAt: undefined
    });
  }

  public update({
    unitPrice,
    promotionalPrice,
    quantityStock,
    quantityBuy,
    numberReviews,
    favorite,
    variation
  }: Partial<ProductSchema>) {
    this.props.unitPrice = unitPrice ?? this.props.unitPrice;
    this.props.promotionalPrice = promotionalPrice ?? this.props.promotionalPrice;
    this.props.quantityStock = quantityStock ?? this.props.quantityStock;
    this.props.quantityBuy = quantityBuy ?? this.props.quantityBuy;
    this.props.numberReviews = numberReviews ?? this.props.numberReviews;
    this.props.favorite = favorite ?? this.props.favorite;
    this.props.variation = variation ?? this.props.variation ?? [];
    this.props.updatedAt = new Date();
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

  get variation(): [{ quantity: number, type: string }] | [] {
    return this.props.variation ?? [];
  }

  get quantityStock(): number {
    return this.props.quantityStock;
  }

  get quantityBuy(): number {
    return this.props.quantityBuy;
  }

  get numberReviews(): number {
    return this.props.numberReviews;
  }

  get favorite(): boolean {
    return this.props.favorite;
  }
}