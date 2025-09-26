import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { ProductCard, Product, ProductCartItem } from "./ProductCard";
import { useTranslation } from "./hooks/useTranslation";

interface FavoritesProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  favoriteProducts: Product[];
  onAddToCart: (item: ProductCartItem) => void;
  onToggleFavorite: (productId: string) => void;
}

export function Favorites({
  isOpen,
  onOpenChange,
  favoriteProducts,
  onAddToCart,
  onToggleFavorite,
}: FavoritesProps) {
  const { t } = useTranslation();

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            {t.favoritesTitle}
            {favoriteProducts.length > 0 && (
              <span className="text-sm text-muted-foreground">
                ({favoriteProducts.length})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {favoriteProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <Heart className="w-16 h-16 text-muted-foreground" />
              <div className="space-y-2">
                <h3>{t.favoritesEmpty}</h3>
                <p className="text-muted-foreground">
                  {t.favoritesEmptyDescription}
                </p>
              </div>
              <Button onClick={() => onOpenChange(false)}>
                {t.continueShopping}
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {favoriteProducts.map((product) => (
                <div key={product.id} className="relative">
                  <ProductCard
                    product={product}
                    onAddToCart={onAddToCart}
                    onToggleFavorite={onToggleFavorite}
                    isFavorite={true}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {favoriteProducts.length > 0 && (
          <div className="border-t pt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => onOpenChange(false)}
            >
              {t.continueShopping}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
