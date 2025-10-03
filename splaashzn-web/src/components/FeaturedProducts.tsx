import { ProductCard, Product } from "./ProductCard";
import { Button } from "./ui/button";
import { Link } from "react-router";

interface FeaturedProductsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

export function FeaturedProducts({
  products,
  onAddToCart,
  onProductClick,
}: FeaturedProductsProps) {
  // Mostrar solo los primeros 4 productos como destacados
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Productos Destacados</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubre las camisetas más populares de la temporada. Personaliza tu
            favorita con nombre, número y parches oficiales.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onProductClick={onProductClick}
            />
          ))}
        </div>

        <div className="text-center">
          <Link to="/catalog">
            <Button size="lg" className="text-lg px-8 py-3">
              Ver todos los productos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
