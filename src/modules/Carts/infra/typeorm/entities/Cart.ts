import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
  } from "typeorm";

  import User from "@modules/Users/infra/typeorm/entities/User"
  
  @Entity("carts")
  class Cart {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    opened: boolean;

    @Column()
    user_id: string;

    @OneToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  
  export default Cart;
  