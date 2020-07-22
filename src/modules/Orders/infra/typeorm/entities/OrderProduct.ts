import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  
  import Product from "@modules/Products/infra/typeorm/entities/Product";
  
  import Order from "@modules/Orders/infra/typeorm/entities/Order";
  
  @Entity("order-products")
  class OrderProduct {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    order_id: string;
  
    @ManyToOne(() => Order)
    @JoinColumn({ name: "order_id" })
    order: Order;

    @Column()
    product_id: string;
  
    @ManyToOne(() => Product)
    @JoinColumn({ name: "product_id" })
    product: Product;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  
  export default OrderProduct;
  