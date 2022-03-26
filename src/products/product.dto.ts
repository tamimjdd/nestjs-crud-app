export interface ProductDTO {
  title: string;
  image: string;
  description: string;
  price: number;
}

export type UpdateProductDTO = Partial<ProductDTO>;