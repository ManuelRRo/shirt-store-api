import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsResolver } from './brands.resolver';
import { PrismaService } from 'src/prisma.service';
import { ProductsModule } from 'src/modules/products/products.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ProductsModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // eslint-disable-next-line @typescript-eslint/require-await
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(
          'first_only_matter_you_cha_in_ttle_le_lls_eadl',
        ),
        global: true,
        signOptions: { expiresIn: '30m' },
      }),
    }),
  ],
  providers: [BrandsResolver, BrandsService, PrismaService, JwtService],
})
export class BrandsModule {}
