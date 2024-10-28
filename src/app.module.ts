import { Module } from '@nestjs/common';

import { CryptoCurrencyModule } from './CryptoCurrency/crypto-currency.module';

@Module({
  imports: [CryptoCurrencyModule],
})
export class AppModule {}
