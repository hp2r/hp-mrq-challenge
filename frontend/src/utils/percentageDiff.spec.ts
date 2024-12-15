import { describe, it, expect } from 'vitest';
import percentageDiff from './percentageDiff';

describe('percentageDiff', () => {
    it('should return 0 when both values are the same', () => {
        expect(percentageDiff(100, 100)).toBe(0);
    });

    it('should return the correct percentage difference when valA is greater than valB', () => {
        expect(percentageDiff(150, 100)).toBe(50);
    });

    it('should return the correct percentage difference when valA is less than valB', () => {
        expect(percentageDiff(50, 100)).toBe(50);
    });

    it('should handle decimal values correctly', () => {
        expect(percentageDiff(75.5, 100)).toBe(24.5);
    });

    it('should handle very small differences correctly', () => {
        expect(percentageDiff(100.0001, 100)).toBeCloseTo(0.0001, 10);
    });

    it('should handle zero values correctly', () => {
        expect(percentageDiff(0, 100)).toBe(100);
        expect(percentageDiff(100, 0)).toBe(Infinity);
    });
});