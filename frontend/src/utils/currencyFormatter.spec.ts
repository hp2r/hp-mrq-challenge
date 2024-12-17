import { describe, it, expect } from 'vitest';
import currencyFormatter from './currencyFormatter';

describe('currencyFormatter', () => {
    it('should format number to USD currency', () => {
        expect(currencyFormatter(1000)).toBe('$1K');
    });

    it('should format number to USD currency with compact notation', () => {
        expect(currencyFormatter(2500000)).toBe('$2.5M');
    });

    it('should return "--" for zero value', () => {
        expect(currencyFormatter(0)).toBe('--');
    });

    it('should return "--" for negative value', () => {
        expect(currencyFormatter(-100)).toBe('-$100');
    });

    it('should format large numbers correctly', () => {
        expect(currencyFormatter(1000000000)).toBe('$1B');
    });

    it('should format decimal numbers correctly', () => {
        expect(currencyFormatter(1234.56)).toBe('$1.2K');
    });
});