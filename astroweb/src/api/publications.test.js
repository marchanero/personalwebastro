import { describe, it, expect } from 'vitest';
import { getPublications } from './publications';

describe('Publications API', () => {
    describe('getPublications', () => {
        it('should return all publications when no filters are provided', async () => {
            const publications = await getPublications();
            expect(publications).toBeDefined();
            expect(publications.length).toBeGreaterThan(0);
        });

        it('should filter publications by year', async () => {
            const year = 2023;
            const publications = await getPublications({ year: year.toString() });
            expect(publications).toBeDefined();
            expect(publications.length).toBeGreaterThan(0);
            publications.forEach(pub => {
                expect(pub.year).toBe(year);
            });
        });

        it('should filter publications by type', async () => {
            const type = 'journal';
            const publications = await getPublications({ type });
            expect(publications).toBeDefined();
            expect(publications.length).toBeGreaterThan(0);
            publications.forEach(pub => {
                expect(pub.type).toBe(type);
            });
        });

        it('should filter publications by keyword', async () => {
            const keyword = 'Deep Learning';
            const publications = await getPublications({ keyword });
            expect(publications).toBeDefined();
            expect(publications.length).toBeGreaterThan(0);
            publications.forEach(pub => {
                expect(pub.keywords.some(k =>
                    k.toLowerCase().includes(keyword.toLowerCase()) ||
                    pub.title.toLowerCase().includes(keyword.toLowerCase())
                )).toBe(true);
            });
        });

        it('should sort publications by year in descending order by default', async () => {
            const publications = await getPublications();
            expect(publications).toBeDefined();
            expect(publications.length).toBeGreaterThan(0);

            for (let i = 1; i < publications.length; i++) {
                expect(publications[i-1].year).toBeGreaterThanOrEqual(publications[i].year);
            }
        });

        it('should sort publications by citations when specified', async () => {
            const publications = await getPublications({ sortBy: 'citations' });
            expect(publications).toBeDefined();
            expect(publications.length).toBeGreaterThan(0);

            for (let i = 1; i < publications.length; i++) {
                expect(publications[i-1].citations).toBeGreaterThanOrEqual(publications[i].citations);
            }
        });

        it('should handle empty results gracefully', async () => {
            const publications = await getPublications({ year: '9999' });
            expect(publications).toBeDefined();
            expect(Array.isArray(publications)).toBe(true);
            expect(publications.length).toBe(0);
        });

        it('should handle invalid filters gracefully', async () => {
            const publications = await getPublications({});
            expect(publications).toBeDefined();
            expect(Array.isArray(publications)).toBe(true);
            expect(publications.length).toBeGreaterThan(0);
        });
    });
});