import { Module } from "@nestjs/common";
import { ProductModule } from "./products/product.module";
import { TypeOrmModule } from "@nestjs/typeorm";
const ormconfig = require("../ormconfig.json");

@Module({
    imports: [TypeOrmModule.forRoot(ormconfig[0]), ProductModule]
})
export class AppModule {
    constructor() {
        // console.log(config)
    }
}
