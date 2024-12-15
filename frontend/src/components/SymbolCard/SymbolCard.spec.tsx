import '@testing-library/jest-dom'
import { fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SymbolCard from "./SymbolCard"
import { nvdaUpState, nvdaDownState, nvdaNeutralState } from './cardStatesStub';
import { renderWithProviders } from '@/utils/test-utils';


describe("SymbolCard Component", () => {
    
    it("Renders the component", () => {
        renderWithProviders(<SymbolCard id={'NVDA'} onClick={vi.fn()} price={123} />, {
            preloadedState: {
                stocks: nvdaUpState.stocks,
                store: nvdaUpState.store
            }
        })

        expect(screen.getByTestId('NVDA-trend-UP')).toBeInTheDocument();
    });
    
    it("Displays the correct trend icon when trend is DOWN", () => {
        renderWithProviders(<SymbolCard id={'NVDA'} onClick={vi.fn()} price={123} />, {
            preloadedState: {
                stocks: nvdaDownState.stocks,
                store: nvdaDownState.store
            }
        })

        expect(screen.getByTestId('NVDA-trend-DOWN')).toBeInTheDocument();
    });

    it("Displays the correct price", () => {
        renderWithProviders(<SymbolCard id={'NVDA'} onClick={vi.fn()} price={150} />, {
            preloadedState: {
                stocks: nvdaNeutralState.stocks,
                store: nvdaNeutralState.store
            }
        })

        expect(screen.getByText('$150')).toBeInTheDocument();
    });

    it("Calls onClick handler when clicked", () => {
        const handleClick = vi.fn();
        renderWithProviders(<SymbolCard id={'NVDA'} onClick={handleClick} price={150} />, {
            preloadedState: {
                stocks: nvdaNeutralState.stocks,
                store: nvdaNeutralState.store
            }
        })

        fireEvent.click(screen.getByText('NVDA'));
        expect(handleClick).toHaveBeenCalledWith('NVDA');
    });

    it("Displays company info when showCardInfo is true", () => {
        renderWithProviders(<SymbolCard id={'NVDA'} onClick={vi.fn()} price={150} />, {
            preloadedState: {
                stocks: nvdaNeutralState.stocks,
                store: nvdaNeutralState.store
            }
        })

        expect(screen.getByText('Nvidia Corp')).toBeInTheDocument();
        expect(screen.getByText('Technology lorem ipsum')).toBeInTheDocument();
        expect(screen.getByText('$12B')).toBeInTheDocument();
    });
});
