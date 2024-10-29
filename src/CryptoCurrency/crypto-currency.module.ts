import { Module } from '@nestjs/common';

import { CryptoCurrencyService } from './crypto-currency.service';
import { CryptoCurrencyGateway } from './crypto-currency.gateway';

@Module({
  providers: [CryptoCurrencyService,CryptoCurrencyGateway ],
})
export class CryptoCurrencyModule {}
