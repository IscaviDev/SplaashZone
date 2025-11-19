import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { Footer } from "../components/Footer";
import { Product, PersonalizationOption } from "../components/ProductCard";

// import { Link } from "react-router";

interface HomePageProps {
  cartItemCount: number;
  onCartClick: () => void;
  onUserClick: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
  featuredProducts: Product[];
  onAddToCart: (
    product: Product,
    selectedSize?: string,
    quantity?: number,
    personalization?: {
      option: PersonalizationOption;
      playerName?: string;
      playerNumber?: string;
      customText?: string;
    }
  ) => void;
  onProductClick: (product: Product) => void;
}

export function HomePage({
  cartItemCount,
  onCartClick,
  onUserClick,
  onSearchChange,
  searchQuery,
  featuredProducts,
  onAddToCart,
  onProductClick,
}: HomePageProps) {
  return (
    <>
      <Header
        cartItemCount={cartItemCount}
        onCartClick={onCartClick}
        onUserClick={onUserClick}
        onSearchChange={onSearchChange}
        searchQuery={searchQuery}
      />

      <main>
        <HeroSection />
        <AboutSection />
        <FeaturedProducts
          products={featuredProducts}
          onAddToCart={onAddToCart}
          onProductClick={onProductClick}
          // onViewAllProducts={() => {}}
        />
      </main>

      <Footer />
    </>
  );
}
