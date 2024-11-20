import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemEntity, ProductEntity, ShoppingCartEntity } from 'src/entities/ecommerce';
import { JWTModule } from '../auth/jwt';

@Module({
   imports: [
      TypeOrmModule.forFeature([ShoppingCartEntity, ProductEntity, CartItemEntity]),
      JWTModule,
   ],
   controllers: [CartController],
   providers: [CartService],
   exports: [CartService],
})
export class CartModule {}
