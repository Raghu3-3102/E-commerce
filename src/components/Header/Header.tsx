
import { Link } from 'react-router-dom';
import { ShoppingCart, Sun, Moon } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import './Header.module.css';

const Header: React.FC = () => {
  const { getCartItemsCount } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const cartItemsCount = getCartItemsCount();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white">
          <ShoppingCart className="h-6 w-6" />
          <span>FakeStore</span>
        </Link>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            {isDark ? <Sun /> : <Moon />}
          </button>

          <Link
            to="/cart"
            className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <ShoppingCart />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex justify-center items-center">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;
