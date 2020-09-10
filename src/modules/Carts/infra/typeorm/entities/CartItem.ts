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

import Cart from "./Cart";

@Entity("cart_items")
class CartItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  quantity: number;

  @Column()
  product_id: string;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column()
  cart_id: string;

  @ManyToOne(() => Cart)
  @JoinColumn({ name: "cart_id" })
  cart: Cart;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CartItem;
