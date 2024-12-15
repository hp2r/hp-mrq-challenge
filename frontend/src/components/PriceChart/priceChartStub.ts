import { StoreState } from "@/store/dashboardOptionsSlice";
import { PriceHistoryState } from "@/store/priceHistorySlice";

export const loadingPriceChartState = {
    priceHistory: {
        symbol: 'NVDA',
        history: [{
            time: 23123234234234,
            price: 100
        }],
        apiState: {
            loading: true,
            error: false
        }
    } as PriceHistoryState,
    store: {
        showCardInfo: false,
        activeSymbol: ''
    } as StoreState
};

export const errorPriceChartState = {
    priceHistory: {
        symbol: 'NVDA',
        history: [{
            time: 23123234234234,
            price: 100
        }],
        apiState: {
            loading: false,
            error: true
        }
    } as PriceHistoryState,
    store: {
        showCardInfo: false,
        activeSymbol: null
    } as StoreState
};

