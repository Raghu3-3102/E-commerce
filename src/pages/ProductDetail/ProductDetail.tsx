
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../context/CartContext';
import { ProductDetailSkeleton } from '../../components/Loading/Loading';
import { ArrowLeft, Star, ShoppingCart, Check } from 'lucide-react';
import './ProductDetail.module.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();
  const { addToCart, cartItems } = useCart();

  const product = products.find(p => p.id === parseInt(id!));
  const isInCart = cartItems.some(item => item.id === product?.id);

  const handleAddToCart = (): void => {
    if (product) {
      addToCart(product);
    }
  };

  const renderRating = (rating: number): JSX.Element => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < fullStars
                  ? 'text-yellow-400 fill-current'
                  : hasHalfStar && i === fullStars
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-lg font-medium text-gray-900 dark:text-white">
          {rating}
        </span>
        <span className="text-gray-500 dark:text-gray-400">
          ({product?.rating?.count} reviews)
        </span>
      </div>
    );
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg mb-4">
          {error ? 'Error loading product' : 'Product not found'}
        </div>
        <Link to="/" className="btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors duration-200"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-96 object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-4">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {product.title}
            </h1>
            {renderRating(product.rating?.rate || 0)}
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              ${product.price}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Add to Cart */}
          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              disabled={isInCart}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                isInCart
                  ? 'bg-green-600 text-white cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              {isInCart ? (
                <>
                  <Check className="h-5 w-5" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>

          {/* Additional Info */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
              Product Details
            </h4>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Availability:</strong> In stock</p>
              <p><strong>Shipping:</strong> Free shipping worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;