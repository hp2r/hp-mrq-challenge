import { StoreState } from "@/store/dashboardOptionsSlice";
import { StocksState } from "@/store/stocksSlice";

export const nvdaUpState = {
    stocks: {
        entities: {
           ['NVDA']: {
                symbol: 'NVDA',
                exchange: 'NASDAQ',
                trend: 'UP',
                industry: 'Technology',
                companyName: 'Nvidia Corp',
                marketCap: 12000000000
            }
        },
        ids: ['NVDA'],
        apiState: {
            loading: false,
            error: false
        }
    } as StocksState,
    store: {
        showCardInfo: false,
        activeSymbol: 'NVDA'
    } as StoreState
};

export const nvdaDownState = {
    stocks: {
        entities: {
           ['NVDA']: {
                symbol: 'NVDA',
                exchange: 'NASDAQ',
                trend: 'DOWN',
                industry: 'Technology',
                companyName: 'Nvidia Corp',
                marketCap: 12000000000
            }
        },
        ids: ['NVDA'],
        apiState: {
            loading: false,
            error: false
        }
    } as StocksState,
    store: {
        showCardInfo: false,
        activeSymbol: 'NVDA'
    } as StoreState
};

export const nvdaNeutralState = {
    stocks: {
        entities: {
           ['NVDA']: {
                symbol: 'NVDA',
                exchange: 'NASDAQ',
                trend: null,
                industry: 'Technology lorem ipsum',
                companyName: 'Nvidia Corp',
                marketCap: 12000000000
            }
        },
        ids: ['NVDA'],
        apiState: {
            loading: false,
            error: false
        }
    } as StocksState,
    store: {
        showCardInfo: true,
        activeSymbol: 'NVDA'
    } as StoreState
};
