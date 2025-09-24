import { useState, useEffect } from "react";
import { Header } from "./components/Header.tsx";
import { Hero } from "./components/Hero.tsx";
import { ProductCatalog } from "./components/ProductCatalog.tsx";
import { Cart, CartItem } from "./components/Cart.tsx";
import { Footer } from "./components/Footer.tsx";
import { Product } from "./components/ProductCard.tsx";
import { toast } from "sonner@2.0.3";

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

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleAddToCart = (productId: string, size: string) => {
    const product = mockProducts.find((p) => p.id === productId);
    if (!product) return;

    const existingItemId = `${productId}-${size}`;
    const existingItem = cartItems.find((item) => item.id === existingItemId);

    if (existingItem) {
      setCartItems((items) =>
        items.map((item) =>
          item.id === existingItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      toast.success(`Cantidad actualizada: ${product.name} (${size})`);
    } else {
      const newItem: CartItem = {
        id: existingItemId,
        productId: product.id,
        name: product.name,
        team: product.team,
        price: product.price,
        image: product.image,
        size,
        quantity: 1,
      };
      setCartItems((items) => [...items, newItem]);
      toast.success(`Agregado al carrito: ${product.name} (${size})`);
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
      toast.success(`Eliminado del carrito: ${item.name}`);
    }
  };

  const handleCheckout = () => {
    // Simulate checkout process
    toast.success("¡Gracias por tu compra! Te redirigimos al pago...");
    setCartItems([]);
    setIsCartOpen(false);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
        onSearchChange={setSearchQuery}
      />

      <main>
        <Hero />
        <ProductCatalog
          products={mockProducts}
          onAddToCart={handleAddToCart}
          searchQuery={searchQuery}
        />
      </main>

      <Footer />

      <Cart
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
