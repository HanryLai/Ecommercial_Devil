import { extend } from "joi";
import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { BaseEntity } from "../base";
import { AccountEntity } from "../auth";
import { CartItemEntity } from "./cart_item.entity";

@Entity({ name: 'shopping_cart' })
export class ShoppingCartEntity extends BaseEntity<ShoppingCartEntity> {
   @Column()
   user_id: string;

   @OneToOne(() => AccountEntity)
   @JoinColumn({name: "user_id"})
   account: AccountEntity;

   @OneToMany(() => CartItemEntity, (cartItem) => cartItem.cart)
   cart_items: CartItemEntity[];
}