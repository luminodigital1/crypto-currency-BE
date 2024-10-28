import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { WebSocket } from 'ws';

import { CryptoCurrency } from '../constants';

@Injectable()
export class CryptoCurrencyService implements OnModuleInit, OnModuleDestroy {
    private results: Record<CryptoCurrency, { price: number; previousPrice: number; currentTime: number; percentageChange: number }> = {
        [CryptoCurrency.Bitcoin]: { price: 0, previousPrice: 0, currentTime: 0, percentageChange: 0 },
        [CryptoCurrency.Ethereum]: { price: 0, previousPrice: 0, currentTime: 0, percentageChange: 0 },
        [CryptoCurrency.Tether]: { price: 0, previousPrice: 0, currentTime: 0, percentageChange: 0 },
        [CryptoCurrency.BNB]: { price: 0, previousPrice: 0, currentTime: 0, percentageChange: 0 },
        [CryptoCurrency.Solana]: { price: 0, previousPrice: 0, currentTime: 0, percentageChange: 0 },
        [CryptoCurrency.USDC]: { price: 0, previousPrice: 0, currentTime: 0, percentageChange: 0 },
        [CryptoCurrency.Dogecoin]: { price: 0, previousPrice: 0, currentTime: 0, percentageChange: 0 },
        [CryptoCurrency.TRON]: { price: 0, previousPrice: 0, currentTime: 0, percentageChange: 0 },
        [CryptoCurrency.Cardano]: { price: 0, previousPrice: 0, currentTime: 0, percentageChange: 0 },
        [CryptoCurrency.Ripple]: { price: 0, previousPrice: 0, currentTime: 0, percentageChange: 0 },
        [CryptoCurrency.Polkadot]: { price: 0, previousPrice: 0, currentTime: 0, percentageChange: 0 },
        [CryptoCurrency.Avalanche]: { price: 0, previousPrice: 0, currentTime: 0, percentageChange: 0 },
    };
    private socket: WebSocket;

    onModuleInit() {
        this.connect();
    }

    onModuleDestroy() {
        this.disconnect();
    }

    private connect() {
        this.socket = new WebSocket('wss://ws.coincap.io/prices?assets=ALL');

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
                        percentageChange: previousPrice ? ((parsedData[currency] - previousPrice) / previousPrice) * 100 : 0, // Calculate percentage change
                    };
                }
            }

            const resultsArray = this.getResultsArray();
            console.log('Updated results array:', resultsArray);
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
    private getResultsArray() {
        return Object.entries(this.results).map(([currency, data]) => ({
            currency,
            ...data,
        }));
    }
}
