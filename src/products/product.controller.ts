import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Patch } from '@nestjs/common';
import { EventPattern } from "@nestjs/microservices";
import { MessagePattern } from "@nestjs/microservices";
import { ProductDTO } from './product.dto';
import { Request } from 'express';

// import { ormconfig } from "./notification.entity";
import { ProductService } from "./product.service";
import { ProductEntity } from "./product.entity";

@Controller('products')
export class ProductController {
    constructor(private readonly products: ProductService) { }

    
    @Get(':id')
    fetchProductsByIds(ids: Array<string>) {
        return this.products.fetchProductsByIds(ids);
    }
    
    @Patch('/:id')
    update(
        @Param('id')  Id: string,
        @Body() dto: ProductDTO
    ): Promise<ProductEntity> {
        return this.products.update(
            Id,
            dto
        );
    }


    @Get()
    index(data: any = undefined): Promise<ProductEntity[]> {
        return this.products.get(data);
    }

    @Post()
    store(@Body() dto: ProductDTO): Promise<ProductEntity> {
        return this.products.store(dto);
    }

    

    @Get(':id')
    show(@Param('id') id: string): Promise<ProductEntity> {
        return this.products.show(id);
    }

    


    @Get('/order_deleted/:id')
    async handleOrderDeleted(
        @Param('id') id: string,
        @Body() dto: ProductDTO
    ) {
        dto.price=1;
        this.products.incrementProductsStock(id,dto);
    }



    @Delete(':id')
    destroy(@Param('id') id: string) {
        return this.products.destroy(id);
    }
}
