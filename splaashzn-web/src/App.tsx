import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { ProductCatalog } from "./components/ProductCatalog";
import { Cart, CartItem } from "./components/Cart";
import { Favorites } from "./components/Favorites";
import { Footer } from "./components/Footer";
import { Auth } from "./components/Auth";
import { Checkout } from "./components/Checkout";
import { Product, ProductCartItem } from "./components/ProductCard";
import { useFavorites } from "./components/hooks/useFavorites";
import { useTranslation } from "./components/hooks/useTranslation";
import { AuthProvider } from "./components/hooks/useAuth";
import { toast, Toaster } from "sonner";

// Mock data para los productos
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Camiseta FC Barcelona 2024/25 Local",
    team: "FC Barcelona",
    league: "La Liga",
    price: 89.99,
    originalPrice: 109.99,
    image:
      "https://images.unsplash.com/photo-1683142028215-8529d43701fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJjZWxvbmElMjBmb290YmFsbCUyMHNoaXJ0fGVufDF8fHx8MTc1ODY2MzAzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    sizes: ["S", "M", "L", "XL", "XXL"],
    isNew: true,
    isOnSale: true,
  },
  {
    id: "2",
    name: "Camiseta Real Madrid 2024/25 Local",
    team: "Real Madrid",
    league: "La Liga",
    price: 94.99,
    image:
      "https://images.unsplash.com/photo-1662096909714-e2f206d0a636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwbWFkcmlkJTIwamVyc2V5fGVufDF8fHx8MTc1ODY2MzAzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    sizes: ["S", "M", "L", "XL", "XXL"],
    isNew: true,
  },
  {
    id: "3",
    name: "Camiseta Manchester United 2024/25 Local",
    team: "Manchester United",
    league: "Premier League",
    price: 79.99,
    originalPrice: 99.99,
    image:
      "https://images.unsplash.com/photo-1662096909687-7c64cde3524b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5jaGVzdGVyJTIwdW5pdGVkJTIwc2hpcnR8ZW58MXx8fHwxNzU4NjMwNjM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    sizes: ["S", "M", "L", "XL"],
    isOnSale: true,
  },
  {
    id: "4",
    name: "Camiseta Liverpool FC 2024/25 Local",
    team: "Liverpool FC",
    league: "Premier League",
    price: 84.99,
    image:
      "https://images.unsplash.com/photo-1699273379193-ab9b36f5078b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlcnBvb2wlMjBmb290YmFsbCUyMGplcnNleXxlbnwxfHx8fDE3NTg2NjMwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "5",
    name: "Camiseta Bayern Munich 2024/25 Local",
    team: "Bayern Munich",
    league: "Bundesliga",
    price: 92.99,
    image:
      "https://images.unsplash.com/photo-1745209979904-a1dcbec3e645?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXllcm4lMjBtdW5pY2glMjBzaGlydHxlbnwxfHx8fDE3NTg2NjMwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    sizes: ["S", "M", "L", "XL", "XXL"],
    isNew: true,
  },
  {
    id: "6",
    name: "Camiseta Arsenal 2024/25 Local",
    team: "Arsenal",
    league: "Premier League",
    price: 76.99,
    originalPrice: 89.99,
    image:
      "https://images.unsplash.com/photo-1668791160369-d20b8175eab2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGplcnNleSUyMHNvY2NlciUyMHNoaXJ0fGVufDF8fHx8MTc1ODY2MzAzNnww&ixlib=rb-4.1.0&q=80&w=1080",
    sizes: ["S", "M", "L", "XL"],
    isOnSale: true,
  },
  {
    id: "7",
    name: "Camiseta PSG 2024/25 Local",
    team: "Paris Saint-Germain",
    league: "Ligue 1",
    price: 99.99,
    image:
      "https://images.unsplash.com/photo-1683142028215-8529d43701fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJjZWxvbmElMjBmb290YmFsbCUyMHNoaXJ0fGVufDF8fHx8MTc1ODY2MzAzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "8",
    name: "Camiseta AC Milan 2024/25 Local",
    team: "AC Milan",
    league: "Serie A",
    price: 87.99,
    image:
      "https://images.unsplash.com/photo-1662096909714-e2f206d0a636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwbWFkcmlkJTIwamVyc2V5fGVufDF8fHx8MTc1ODY2MzAzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    sizes: ["S", "M", "L", "XL"],
  },
];

function AppContent() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Hooks for favorites and translations
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { t } = useTranslation();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("futbolshirt-cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("futbolshirt-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (item: ProductCartItem) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCartItems((items) =>
        items.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        )
      );
      toast.success(t.quantityUpdated);
    } else {
      setCartItems((items) => [...items, item]);
    }
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(itemId);
      return;
    }

    setCartItems((items) =>
      items.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    const item = cartItems.find((item) => item.id === itemId);
    setCartItems((items) => items.filter((item) => item.id !== itemId));
    if (item) {
      toast.success(t.removedFromCart);
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSuccess = () => {
    setCartItems([]);
    toast.success(t.thankYou);
  };

  // Get favorite products for the favorites component
  const favoriteProducts = mockProducts.filter((product) =>
    favorites.includes(product.id)
  );

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemCount={cartItemCount}
        favoritesCount={favorites.length}
        onCartClick={() => setIsCartOpen(true)}
        onFavoritesClick={() => setIsFavoritesOpen(true)}
        onSearchChange={setSearchQuery}
        onAuthClick={() => setIsAuthOpen(true)}
      />

      <main>
        <div id="home">
          <Hero />
        </div>
        <div id="products">
          <ProductCatalog
            products={mockProducts}
            onAddToCart={handleAddToCart}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
            searchQuery={searchQuery}
          />
        </div>
        <div id="about">
          <About />
        </div>
      </main>

      <div id="contact">
        <Footer />
      </div>

      <Cart
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <Favorites
        isOpen={isFavoritesOpen}
        onOpenChange={setIsFavoritesOpen}
        favoriteProducts={favoriteProducts}
        onAddToCart={handleAddToCart}
        onToggleFavorite={toggleFavorite}
      />

      {isAuthOpen && <Auth onClose={() => setIsAuthOpen(false)} />}

      {isCheckoutOpen && cartItems.length > 0 && (
        <Checkout
          items={cartItems}
          total={cartTotal}
          onClose={() => setIsCheckoutOpen(false)}
          onSuccess={handleCheckoutSuccess}
        />
      )}

      <Toaster position="bottom-right" />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
