import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BrandsModule } from './modules/brands/brands.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ProductsModule } from './modules/products/products.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { VariantsModule } from './modules/variants/variants.module';
import { ProductCategoriesModule } from './modules/product-categories/product-categories.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { DataloaderModule } from './common/modules/dataloader/dataloader.module';
import { DataLoaderService } from './common/modules/dataloader/dataloader.service';
import { OrdersModule } from './modules/orders/orders.module';
import { LikesModule } from './modules/likes/likes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataloaderModule],
      useFactory: (dataloderService: DataLoaderService) => ({
        autoSchemaFile: 'src/schema.gql',
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        introspection: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        context: ({ req }) => ({ req, loaders: dataloderService.getLoaders() }),
      }),
      inject: [DataLoaderService],
    }),
    UsersModule,
    AuthModule,
    BrandsModule,
    ProductsModule,
    VariantsModule,
    ProductCategoriesModule,
    CategoriesModule,
    DataloaderModule,
    OrdersModule,
    LikesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
