import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

import User from "@modules/Users/infra/typeorm/entities/User";
import CartItem from "./CartItem";
import Customer from "@modules/Customers/infra/typeorm/entities/Customer";
import { Expose } from "class-transformer";

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

  @OneToMany(
    (type) => CartItem,
    (cart_item) => cart_item.cart,
    { eager: true }
  )
  cart_item: CartItem[];

  @Column()
  customer_id: string;

  @ManyToOne(() => Customer, { eager: true })
  @JoinColumn({ name: "customer_id" })
  customer: Customer;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: "total" })
  getTotal(): number {
    if (this.cart_item) {
      let total: number = 0;

      this.cart_item.map((item) => {
        total += item.quantity * item.product.price;
      });

      return total;
    } else {
      return 0;
    }
  }
}

export default Cart;
