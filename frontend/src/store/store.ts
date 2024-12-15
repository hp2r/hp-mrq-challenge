import { combineReducers, configureStore } from '@reduxjs/toolkit'

import dashboardOptionsSlice from './dashboardOptionsSlice';
import pricesSlice from './pricesSlice';
import stocksSlice from './stocksSlice';
import priceHistorySlice from './priceHistorySlice';

const rootReducer = combineReducers({
    store: dashboardOptionsSlice,
    prices: pricesSlice.reducer,
    stocks: stocksSlice.reducer,
    priceHistory: priceHistorySlice.reducer
})

export function setupStore(preloadedState?: Partial<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']