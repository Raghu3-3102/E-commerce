
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types';
import './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  console.log("Add to cart",addToCart)

  const handleAddToCart = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const renderRating = (rating: number): JSX.Element => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${
              i < Math.floor(rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 dark:text-gray-400">
          ({rating})
        </span>
      </div>
    );
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="card h-full flex flex-col">
        {/* Product Image */}
        <div className="relative pt-[75%] bg-white overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.title}
            className="absolute top-0 left-0 w-full h-full object-contain p-4"
            loading="lazy"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 p-4 flex flex-col">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
              {product.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
              {product.category}
            </p>
            {renderRating(product.rating?.rate || 0)}
          </div>

          {/* Price and Action */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ${product.price}
            </span>
            <button
              onClick={handleAddToCart}
              className="btn-primary flex items-center space-x-1 text-sm"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;