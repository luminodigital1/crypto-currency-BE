import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { WebSocket } from 'ws';

import { CryptoCurrency, CryptoData } from '../constants';
import { initializeCryptoData } from 'src/helper';

@Injectable()
export class CryptoCurrencyService implements OnModuleInit, OnModuleDestroy {
  private results: Record<CryptoCurrency, CryptoData>;
  private socket: WebSocket;

  constructor() {
    this.results = initializeCryptoData();
  }

  onModuleInit() {
    this.connect();
  }

  onModuleDestroy() {
    this.disconnect();
  }

  private connect() {
    this.socket = new WebSocket(process.env.COINCAP_URL);

    this.socket.on('open', () => {
      console.log('WebSocket connection established.');
    });

    this.socket.on('message', (data) => {
      const parsedData = JSON.parse(data.toString());
      for (const currency in parsedData) {
        if (this.results[currency as CryptoCurrency]) {
          const previousPrice = this.results[currency as CryptoCurrency].price;

          this.results[currency as CryptoCurrency] = {
            price: parsedData[currency],
            previousPrice: previousPrice,
            currentTime: Date.now(),
            percentageChange: previousPrice
              ? ((parsedData[currency] - previousPrice) / previousPrice) * 100
              : 0,
          };
        }
      }

      const resultsArray = this.getResultsArray();
    });

    this.socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  }

  private disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
  public getResultsArray() {
    return Object.entries(this.results).map(([currency, data]) => ({
      currency,
      ...data,
    }));
  }
}
