import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './common/database';
import { AccountEntity, DetailInformationEntity, RoleEntity } from './entities/auth';
import { LoggerMiddleware } from './middleware';
import {
   AdminSeeder,
   CategorySeeder,
   FeedbackSeeder,
   ListOptionSeeder,
   OptionSeeder,
   ProductSeeder,
   RoleSeeder,
} from './seeders';
import { AuthModule } from './app/auth';
import { RoleModule } from './app/role';
import { CloudinaryModule } from './utils/cloudinary/cloudinary.module';
import { ProductModule } from './app/product/product.module';
import { FavoriteModule } from './app/favorite/favorite.module';
import {
   CartItemEntity,
   FavoriteEntity,
   CategoryEntity,
   ListOptionEntity,
   OptionCartEntity,
   OptionEntity,
   ProductEntity,
   ShoppingCartEntity,
   FeedbackEntity,
   OrderEntity,
   OrderItemEntity,
} from './entities/ecommerce';
import { RunAllSeeder } from './seeders/run.seeder';
import { FeedbacksModule } from './app/feedbacks/feedbacks.module';
import { ChatModule } from './app/chat/chat.module';
import { CartModule } from './app/cart/cart.module';
import { DetailInformationModule } from './app/detail-information/detail-information.module';
import { FakerModule } from './utils/faker/faker.module';
import { FavoriteSeeder } from './seeders/favorite.seeder';
import { CategoryModule } from './app/category/category.module';
import { OptionModule } from './app/option/option.module';
import { ListOptionModule } from './app/list-option/list-option.module';
import { CartSeeder } from './seeders/cart.seeder';
import { OrderModule } from './app/order/order.module';
import { PaymentModule } from './app/payment/payment.module';

@Module({
   imports: [
      TypeOrmModule.forFeature([
         RoleEntity,
         AccountEntity,
         ProductEntity,
         FavoriteEntity,
         ShoppingCartEntity,
         CartItemEntity,
         OptionCartEntity,
         DetailInformationEntity,
         CategoryEntity,
         OptionEntity,
         ListOptionEntity,
         FeedbackEntity,
         DetailInformationEntity,
         FeedbackEntity,
         OrderEntity,
         OrderItemEntity,
      ]),

      DatabaseModule,
      AuthModule,
      RoleModule,
      CloudinaryModule,
      ProductModule,
      FavoriteModule,
      FeedbacksModule,
      ChatModule,
      CartModule,
      DetailInformationModule,
      FakerModule,
      CategoryModule,
      OptionModule,
      ListOptionModule,
      FeedbacksModule,
      OrderModule,
      PaymentModule,
   ],
   providers: [
      RunAllSeeder,
      RoleSeeder,
      AdminSeeder,
      ProductSeeder,
      FavoriteSeeder,
      CategorySeeder,
      OptionSeeder,
      ListOptionSeeder,
      FeedbackSeeder,
      CartSeeder,
   ],
})
export class AppModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware).forRoutes('*');
   }
}
