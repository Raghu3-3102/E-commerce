import  { useState, useMemo } from 'react';
import { useProducts, useProductFilters } from '../../hooks/useProducts';
import ProductCard from '../../components/ProductCard/ProductCard';
import { ProductCardSkeleton } from '../../components/Loading/Loading';
import SearchBar from '../../components/SearchBar/SearchBar';
import './Home.module.css';
import banner from '../../assets/banner_3.webp';

const Home: React.FC = () => {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const [category, setCategory] = useState<string>('all');

  const filteredProducts = useProductFilters(products, { search, sort, category });

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    return ['all', ...uniqueCategories];
  }, [products]);

  const handleSearch = (query: string): void => {
    console.log('Search query:', query); // Debug log
    setSearch(query);
  };

  // Debug: log filtered products
  console.log('Filtered products count:', filteredProducts.length);
  console.log('Search term:', search);

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg mb-4">Error loading products</div>
        <button 
          onClick={() => window.location.reload()} 
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Header Section */}
      <div className="w-full h-64 mb-10">
  <img
    src={banner}
    className="w-full h-full object-cover rounded-xl"
    alt="Banner"
  />
</div>


      {/* Filters Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Products
            </label>
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Search by name, category..." 
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sort By
            </label>
            <select
              value={sort}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSort(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            >
              <option value="">Default</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-a-z">Name: A to Z</option>
              <option value="name-z-a">Name: Z to A</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          Showing {filteredProducts.length} of {products.length} products
          {search && ` for "${search}"`}
        </p>
        {(search || category !== 'all' || sort) && (
          <button
            onClick={() => {
              setSearch('');
              setCategory('all');
              setSort('');
            }}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
            {search ? `No products found for "${search}"` : 'No products found matching your criteria'}
          </div>
          <button
            onClick={() => {
              setSearch('');
              setCategory('all');
              setSort('');
            }}
            className="btn-primary"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;