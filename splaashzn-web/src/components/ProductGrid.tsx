import { ProductCard, Product } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  searchQuery: string;
}

export function ProductGrid({ products, onAddToCart, onProductClick, searchQuery }: ProductGridProps) {
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.team.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Nuestras camisetas</h2>
        <p className="text-muted-foreground">
          {filteredProducts.length} productos encontrados
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onProductClick={onProductClick}
          />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No se encontraron productos que coincidan con tu búsqueda.
          </p>
        </div>
      )}
    </section>
  );
}