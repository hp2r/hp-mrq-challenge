import '@testing-library/jest-dom'
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PriceChart from "./PriceChart"
import { errorPriceChartState, loadingPriceChartState } from './priceChartStub';
import { renderWithProviders } from '@/utils/test-utils';

describe("PriceChart Component", () => {

    describe("Check the chart with data", () => {

        it("Renders the component", async() => {
            renderWithProviders(<PriceChart symbolId={'NVDA'} />)

            await waitFor(() => {
                expect(screen.getByText(/PRICE HISTORY/)).toBeInTheDocument();
            });
        });
    });

    describe("Check the chart states without data", () => {

        it("Displays loading state", () => {
            const render = renderWithProviders(<PriceChart symbolId={'NVDA'} />, {
                preloadedState: {
                    priceHistory: loadingPriceChartState.priceHistory,
                    store: loadingPriceChartState.store
                }
            })

            expect(render.getByTestId('loading-animation')).toBeInTheDocument();
        });

        it("Displays error state", () => {
            const render = renderWithProviders(<PriceChart symbolId={'NVDA'} />, {
                preloadedState: {
                    priceHistory: errorPriceChartState.priceHistory,
                    store: errorPriceChartState.store
                }
            })

            expect(render.getByText(/Failed to get price history!/)).toBeInTheDocument();
        });
    });

});