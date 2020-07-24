import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import User from "@modules/Users/infra/typeorm/entities/User";
import CartItem from "./CartItem";

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

  @Column()
  cart_item_id: string;

  @ManyToOne(() => CartItem)
  @JoinColumn({ name: "cart_item_id" })
  cart_item: CartItem[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Cart;
