export enum CryptoCurrency {
  Bitcoin = 'bitcoin',
  Ethereum = 'ethereum',
  Tether = 'tether',
  BNB = 'bnb',
  Solana = 'solana',
  USDC = 'usdc',
  Dogecoin = 'dogecoin',
  TRON = 'tron',
  Cardano = 'cardano',
  Ripple = 'ripple',
  Polkadot = 'polkadot',
  Avalanche = 'avalanche',
}

export interface CryptoData {
  price: number;
  previousPrice: number;
  currentTime: number;
  percentageChange: number;
}
