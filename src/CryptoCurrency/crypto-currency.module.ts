import { Module } from '@nestjs/common';

import { CryptoCurrencyService } from './crypto-currency.service';

@Module({
  providers: [CryptoCurrencyService],
})
export class CryptoCurrencyModule {}
