import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SymbolCard from "./SymbolCard"
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { nvdaUpState, nvdaDownState, nvdaNeutralState } from './cardStates';

test("Renders the main page", () => {
    const mockStore = (state = nvdaUpState) => configureMockStore()(state);

    render(
        <Provider store={mockStore()}>
            <SymbolCard id={'NVDA'} onClick={vi.fn()} price={123}/>
        </Provider>
    );

    expect(screen.getByTestId('NVDA-trend-UP')).toBeInTheDocument();
})