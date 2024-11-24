import { BaseService } from '@/common/base';
import { CurrentUserDto } from '@/common/interceptor';
import { CartItemEntity, FeedbackEntity, OrderEntity, OrderItemEntity } from '@/entities/ecommerce';
import {
   CartItemRepository,
   FeedbackRepository,
   OrderItemRepository,
   OrderRepository,
} from '@/repositories/ecommerce';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth';
import { CreateOrderDto } from './dto/create-order.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class OrderService extends BaseService {
   constructor(
      @InjectRepository(OrderEntity) private orderRepository: OrderRepository,
      @InjectRepository(OrderItemEntity) private orderItemRepository: OrderItemRepository,
      @InjectRepository(CartItemEntity) private cartItemRepository: CartItemRepository,
      @InjectRepository(FeedbackEntity) private feedbackRepository: FeedbackRepository,

      @Inject() private readonly authService: AuthService,
      private entityManager: EntityManager,
   ) {
      super();
   }

   async orderMulti(user: CurrentUserDto, createOrderDto: CreateOrderDto) {
      try {
         const cartItemId = createOrderDto.cartItemIds;
         const detailInformation = await this.authService.findMyAccount(user);
         if (!detailInformation) {
            return this.NotFoundException('Detail information not found');
         }

         const account = await this.authService.findMyAccount(user);

         if (!account) {
            return this.NotFoundException('Account not found');
         }

         // Find all cart items order
         const cartItems: CartItemEntity[] = [];
         for (const id of cartItemId) {
            const cartItem = await this.cartItemRepository.findOne({
               where: { id },
               relations: ['item', 'options', 'options.listOption'],
            });
            if (!cartItem) {
               return this.NotFoundException('Cart item not found');
            }
            cartItems.push(cartItem);
         }

         // product_id from cartItems
         // quantity from cartItems
         // single_price from caculate cartItems from product.price and adjust price of optionCart with listOtions
         // With product_description from OptionCart ListOption
         let total_price = 0;
         const saveOrder = await this.orderRepository.save({
            total_price: total_price,
            full_name: detailInformation.detailInformation.full_name,
            phone: detailInformation.detailInformation.phone,
            address: detailInformation.detailInformation.address,
            account_id: user.id,
         });

         for (const cartItem of cartItems) {
            const product_id = cartItem.item.id;
            const quantity = cartItem.quantity;
            let single_price = cartItem.item.price;
            let product_description = '';
            for (const optionCart of cartItem.options) {
               const listOption = optionCart.listOption;
               single_price += listOption.adjustPrice;
               product_description += listOption.name + ', ';
            }
            product_description = product_description.slice(0, -2);

            total_price += single_price * quantity;
            // Create order item

            const createFeedback = await this.feedbackRepository.save({
               account,
               product_id,
            });

            const orderItemSave = await this.orderItemRepository.save({
               product_id,
               quantity,
               single_price,
               product_description,
               order_id: saveOrder.id,
               feedback_id: createFeedback.id,
            });

            const product = await this.orderItemRepository.findOne({ where: { product_id } });

            await this.orderItemRepository.save(orderItemSave);
         }

         await this.orderRepository.update({ id: saveOrder.id }, { total_price });

         // Delete all cart items
         for (const cartItem of cartItems) {
            const cartItemDelete = await this.cartItemRepository.findOne({ where: { id: cartItem.id }, relations: ['options'] });
            for (const option of cartItemDelete.options) {
               await this.entityManager.remove(option);
            }
            await this.entityManager.remove(cartItemDelete);
         }

         return await this.orderRepository.findOne({
            where: { id: saveOrder.id },
            relations: ['orderItems', 'orderItems.products'],
         });
      } catch (error) {
         return this.ThrowError(error);
      }
   }

   async getOrders(user: CurrentUserDto) {
      try {
         const orders = await this.orderRepository.find({
            where: { account_id: user.id },
            relations: ['orderItems', 'orderItems.products'],
         });

         return orders;
      } catch (error) {
         return this.ThrowError(error);
      }
   }

   async getOrderById(user: CurrentUserDto, orderId: string) {
      try {
         const order = await this.orderRepository.findOne({
            where: { id: orderId, account_id: user.id },
            relations: ['orderItems', 'orderItems.products'],
         });

         return order;
      } catch (error) {
         return this.ThrowError(error);
      }
   }

   async cancelOrder(user: CurrentUserDto, orderId: string) {
      try {
         const order = await this.orderRepository.findOne({
            where: { id: orderId, account_id: user.id },
            relations: ['orderItems'],
         });

         if (!order) {
            return this.NotFoundException('Order not found');
         }

         if (order.orderItems.length > 0) {
            return this.BadRequestException('Order has been processed, cannot be canceled');
         }

         await this.orderRepository.delete({ id: orderId });

         return { message: 'Cancel order successfully' };
      } catch (error) {
         return this.ThrowError(error);
      }
   }
}