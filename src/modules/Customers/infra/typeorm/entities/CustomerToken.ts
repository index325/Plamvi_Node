import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from "typeorm";

@Entity("customer_tokens")
class CustomerToken {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Generated("uuid")
  token: string;

  @Column()
  customer_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CustomerToken;
