import { useState, useEffect, useMemo } from 'react';
import { Product, UseProductsReturn, ProductFilters } from '../types';
import BaseUrl from '../services/BaeUrl';


const API_URL = `${BaseUrl}/products`;

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export const useProductFilters = (
  products: Product[], 
  filters: ProductFilters
): Product[] => {
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Search filter - make sure this logic is correct
    if (filters.search) {
      const searchLower = filters.search.toLowerCase().trim();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Sort products
    if (filters.sort) {
      switch (filters.sort) {
        case 'price-low-high':
          filtered = [...filtered].sort((a, b) => a.price - b.price);
          break;
        case 'price-high-low':
          filtered = [...filtered].sort((a, b) => b.price - a.price);
          break;
        case 'name-a-z':
          filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'name-z-a':
          filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title));
          break;
        case 'rating':
          filtered = [...filtered].sort((a, b) => b.rating.rate - a.rating.rate);
          break;
        default:
          break;
      }
    }

    return filtered;
  }, [products, filters.search, filters.sort, filters.category]);

  return filteredProducts;
};