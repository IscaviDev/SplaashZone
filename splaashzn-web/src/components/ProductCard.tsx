import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export interface PersonalizationOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  team: string;
  league?: string;
  country?: string;
  jerseyType?: string;
  season?: string;
  price: number;
  originalPrice?: number;
  image: string[];
  sizes: string[];
  inStock: boolean;
  personalizationOptions: PersonalizationOption[];
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

export function ProductCard({
  product,
  onAddToCart,
  onProductClick,
}: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0">
        <div
          className="relative overflow-hidden rounded-t-lg"
          onClick={() => onProductClick(product)}
        >
          <ImageWithFallback
            src={product.image[0]}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* {discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
              -{discount}%
            </Badge>
          )} */}
          {/* {!product.inStock && (
            <Badge variant="secondary" className="absolute top-2 right-2">
              Agotado
            </Badge>
          )} */}
        </div>

        <div className="p-4" onClick={() => onProductClick(product)}>
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-2">{product.team}</p>

          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg font-bold text-primary">
              €{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                €{product.originalPrice}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            {product.sizes.slice(0, 4).map((size) => (
              <Badge key={size} variant="outline" className="text-xs">
                {size}
              </Badge>
            ))}
            {product.sizes.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{product.sizes.length - 4}
              </Badge>
            )}
          </div>

          <div className="mb-3">
            <p className="text-xs text-muted-foreground mb-1">
              Personalización disponible:
            </p>
            <div className="flex flex-wrap gap-1">
              {product.personalizationOptions.slice(0, 2).map((option) => (
                <Badge key={option.id} variant="secondary" className="text-xs">
                  {option.name}
                </Badge>
              ))}
              {product.personalizationOptions.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{product.personalizationOptions.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-4 px-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="w-full cursor-pointer"
              onClick={() => onAddToCart(product)}
              // disabled={!product.inStock}
            >
              Añadir al carrito
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to cart</p>
          </TooltipContent>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}
