import { useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router";
import { HomePage } from "./pages/HomePage";
import { CatalogPage } from "./components/CatalogPage";
import { Cart, CartItem } from "./components/Cart";
import { ProductDetail } from "./components/ProductDetail";
import { Product, PersonalizationOption } from "./components/ProductCard";
import { allProducts } from "./data/products";

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = (
    product: Product,
    selectedSize?: string,
    quantity: number = 1,
    personalization?: {
      option: PersonalizationOption;
      playerName?: string;
      playerNumber?: string;
      customText?: string;
    }
  ) => {
    const size = selectedSize || product.sizes[0];
    const itemId = `${product.id}-${size}-${
      personalization?.option.id || "none"
    }`;

    const existingItem = cartItems.find((item) => item.id === itemId);

    const finalPrice = product.price + (personalization?.option.price || 0);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      const newItem: CartItem = {
        ...product,
        id: itemId,
        originalId: product.id,
        selectedSize: size,
        quantity,
        price: finalPrice,
        personalization,
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      setCartItems(
        cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  };

  const handleAddToCartFromDetail = (
    product: Product,
    selectedSize: string,
    quantity: number,
    personalization?: {
      option: PersonalizationOption;
      playerName?: string;
      playerNumber?: string;
      customText?: string;
    }
  ) => {
    addToCart(product, selectedSize, quantity, personalization);
  };

  // Get featured products (first 8 products from the dataset)
  const featuredProducts = allProducts.slice(0, 8);

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                cartItemCount={cartItemCount}
                onCartClick={() => setIsCartOpen(true)}
                onSearchChange={setSearchQuery}
                searchQuery={searchQuery}
                featuredProducts={featuredProducts}
                onAddToCart={addToCart}
                onProductClick={handleProductClick}
              />
            }
          />
          <Route
            path="/catalog"
            element={
              <CatalogPage
                products={allProducts}
                cartItemCount={cartItemCount}
                onCartClick={() => setIsCartOpen(true)}
                onSearchChange={setSearchQuery}
                searchQuery={searchQuery}
                onAddToCart={addToCart}
                onProductClick={handleProductClick}
              />
            }
          />
          {/* Handle preview_page.html and other unmatched routes */}
          <Route
            path="/preview_page.html"
            element={<Navigate to="/" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
        />

        <ProductDetail
          product={selectedProduct}
          isOpen={isProductDetailOpen}
          onClose={() => setIsProductDetailOpen(false)}
          onAddToCart={handleAddToCartFromDetail}
        />
      </div>
    </Router>
  );
}
