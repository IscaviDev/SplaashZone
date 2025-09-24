import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface Product {
  id: string;
  name: string;
  team: string;
  league: string;
  price: number;
  originalPrice?: number;
  image: string;
  sizes: string[];
  isNew?: boolean;
  isOnSale?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string, size: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const handleAddToCart = () => {
    // Por defecto usa la primera talla disponible
    onAddToCart(product.id, product.sizes[0]);
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <div className="aspect-square overflow-hidden">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 space-y-1">
          {product.isNew && (
            <Badge className="bg-green-500 hover:bg-green-600">Nuevo</Badge>
          )}
          {product.isOnSale && discount > 0 && (
            <Badge className="bg-red-500 hover:bg-red-600">-{discount}%</Badge>
          )}
        </div>

        {/* Favorite button */}
        <Button
          size="icon"
          variant="outline"
          className="absolute top-2 right-2 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">{product.league}</div>
          <h3 className="line-clamp-2">{product.name}</h3>
          <div className="text-sm text-muted-foreground">{product.team}</div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xl text-primary">€{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                €{product.originalPrice}
              </span>
            )}
          </div>

          <div className="text-sm text-muted-foreground">
            Tallas: {product.sizes.join(", ")}
          </div>
        </div>

        <Button className="w-full gap-2" onClick={handleAddToCart}>
          <ShoppingCart className="w-4 h-4" />
          Añadir al Carrito
        </Button>
      </CardContent>
    </Card>
  );
}
