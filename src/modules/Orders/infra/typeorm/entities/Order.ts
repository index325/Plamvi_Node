import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  
  import User from "@modules/Users/infra/typeorm/entities/User";
  
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
  
    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    product: User;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  
  export default Order;
  