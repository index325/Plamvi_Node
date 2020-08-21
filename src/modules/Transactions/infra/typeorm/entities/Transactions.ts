import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import Order from "@modules/Orders/infra/typeorm/entities/Order";

@Entity("transactions")
class Transactions {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  order_id: string;

  @ManyToOne(() => Order)
  @JoinColumn({ name: "order_id" })
  order: Order;

  @Column()
  authorization_code: string;

  @Column()
  tid: string;

  @Column()
  installments: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transactions;
