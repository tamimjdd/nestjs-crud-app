import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { RpcException } from "@nestjs/microservices";

import { ProductEntity } from "./product.entity";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly products: Repository<ProductEntity>
    ) { }

    get(data: any = undefined): Promise<ProductEntity[]> {
        return this.products.find(data);
    }



    fetchProductsByIds(ids: Array<string>) {
        return this.products
            .createQueryBuilder("products")
            .where(`products.id IN (:...ids)`, { ids })
            .getMany();
    }



    store(data: any): Promise<ProductEntity> {
        return this.products.save(data);
    }

    async update(
        id: string,
        data: any,
    ): Promise<ProductEntity> {
        await this.products.update({ id }, data);
        return this.products.findOneOrFail({ id });

        throw new RpcException(
            new NotFoundException("You cannot update what you don't own...")
        );
    }



    async show(id: string): Promise<ProductEntity> {
        return this.products.findOneOrFail({ id });
    }



    async destroy(id: string): Promise<any> {
        return this.products.delete( id );
        
    }



    async decrementProductsStock(products) {
        products.forEach(product => {
            this.products.decrement(
                { id: product.id },
                "quantity",
                product.quantity
            );
        });
    }



    async incrementProductsStock(id: string,data: any) {
        
        await this.products.update({ id }, data);
        return this.products.findOneOrFail({ id });
    }
}
