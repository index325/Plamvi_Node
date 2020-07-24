import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity("orders")
  class Order {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    total: number;

    @Column()
    fee: number;

    @Column()
    daysToDeliver: number;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  
  export default Order;
  