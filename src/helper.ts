import { CryptoCurrency, CryptoData } from './constants';

export const initializeCryptoData = (): Record<CryptoCurrency, CryptoData> => {
  const defaultData: CryptoData = {
    price: 0,
    previousPrice: 0,
    currentTime: 0,
    percentageChange: 0,
  };

  return Object.values(CryptoCurrency).reduce(
    (acc, currency) => {
      acc[currency] = { ...defaultData };
      return acc;
    },
    {} as Record<CryptoCurrency, CryptoData>,
  );
};
