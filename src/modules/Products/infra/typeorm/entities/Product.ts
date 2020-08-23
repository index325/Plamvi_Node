import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  
  import Customer from "@modules/Customers/infra/typeorm/entities/Customer";
  
  @Entity("products")
  class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    image_url: string;

    @Column()
    price: number;

    @Column()
    sku: string;

    @Column()
    short_description: string;

    @Column()
    description: string;

    @Column()
    customer_id: string;
  
    @ManyToOne(() => Customer)
    @JoinColumn({ name: "customer_id" })
    customer: Customer;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  
  export default Product;
  