import {
    Column,
    Entity,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity("product")
export class ProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true, length: "512" })
    title: string;


    @Column({ length: "1024" })
    description: string;

    @Column()
    price: number;

    @Column({ type: String })
    type: string;

    @CreateDateColumn()
    created_at: Date;


    @UpdateDateColumn()
    updated_at: Date;
}
