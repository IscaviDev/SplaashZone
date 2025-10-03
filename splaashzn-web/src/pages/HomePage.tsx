import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { Footer } from "../components/Footer";
import { Product, PersonalizationOption } from "../components/ProductCard";
import { Link } from "react-router-dom";

interface HomePageProps {
  cartItemCount: number;
  onCartClick: () => void;
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
  onSearchChange, 
  searchQuery, 
  featuredProducts,
  onAddToCart,
  onProductClick
}: HomePageProps) {
  return (
    <>
      <Header
        cartItemCount={cartItemCount}
        onCartClick={onCartClick}
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
          onViewAllProducts={() => {}}
        />
      </main>
      
      <Footer />
    </>
  );
}