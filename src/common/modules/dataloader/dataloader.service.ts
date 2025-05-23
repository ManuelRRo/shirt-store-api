import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { Variants } from 'generated/prisma';
import { VariantsService } from 'src/modules/variants/variants.service';
import { IDataLoaders } from './dataloader.interface';

@Injectable()
export class DataLoaderService {
  constructor(private readonly variantsService: VariantsService) {}
  getLoaders(): IDataLoaders {
    const variantsLoader = this.createVariantsLoader();
    return {
      variantsLoader,
    };
  }
  createVariantsLoader() {
    return new DataLoader<string, Variants[]>(
      async (keys: readonly string[]) =>
        await this.variantsService.getVariantsProductsByBatch(keys as string[]),
    );
  }
}
