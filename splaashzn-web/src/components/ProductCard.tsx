import { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTranslation } from "./hooks/useTranslation";
import { toast } from "sonner";

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

export interface ProductCartItem {
  id: string;
  name: string;
  team: string;
  league: string;
  price: number;
  image: string;
  size: string;
  personalization: string;
  quantity: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (item: ProductCartItem) => void;
  onToggleFavorite?: (productId: string) => void;
  isFavorite?: boolean;
}

export function ProductCard({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
}: ProductCardProps) {
  const { t } = useTranslation();
  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [personalization, setPersonalization] = useState("none");
  const [playerName, setPlayerName] = useState("");
  const [playerNumber, setPlayerNumber] = useState("");

  const handleAddToCart = () => {
    setShowCustomization(true);
  };

  const handleConfirmAddToCart = () => {
    if (!selectedSize) {
      toast.error(t.product.pleaseSelectSize);
      return;
    }

    let personalizationText = t.product.personalizationOptions.none;
    let extraPrice = 0;

    switch (personalization) {
      case "number-name":
        if (!playerName || !playerNumber) {
          toast.error(t.product.pleaseEnterNameNumber);
          return;
        }
        personalizationText = `${playerNumber} - ${playerName}`;
        extraPrice = 15;
        break;
      case "number-name-patch":
        if (!playerName || !playerNumber) {
          toast.error(t.product.pleaseEnterNameNumber);
          return;
        }
        personalizationText = `${playerNumber} - ${playerName} + ${t.product.patch}`;
        extraPrice = 25;
        break;
      case "patch-only":
        personalizationText = t.product.patch;
        extraPrice = 10;
        break;
    }

    const cartItem: ProductCartItem = {
      id: `${product.id}-${selectedSize}-${personalization}`,
      name: product.name,
      team: product.team,
      league: product.league,
      price: product.price + extraPrice,
      image: product.image,
      size: selectedSize,
      personalization: personalizationText,
      quantity: 1,
    };

    onAddToCart(cartItem);
    setShowCustomization(false);
    setSelectedSize("");
    setPersonalization("none");
    setPlayerName("");
    setPlayerNumber("");
    toast.success(t.addedToCart);
  };

  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite(product.id);
      toast.success(isFavorite ? t.removedFromFavorites : t.addedToFavorites);
    }
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const getPersonalizationPrice = () => {
    switch (personalization) {
      case "number-name":
        return 15;
      case "number-name-patch":
        return 25;
      case "patch-only":
        return 10;
      default:
        return 0;
    }
  };

  const getTotalPrice = () => {
    return product.price + getPersonalizationPrice();
  };

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
            <Badge className="bg-green-500 hover:bg-green-600">{t.new}</Badge>
          )}
          {product.isOnSale && discount > 0 && (
            <Badge className="bg-red-500 hover:bg-red-600">-{discount}%</Badge>
          )}
        </div>

        {/* Favorite button */}
        {onToggleFavorite && (
          <Button
            size="icon"
            variant="outline"
            className={`absolute top-2 right-2 bg-white/90 hover:bg-white transition-all ${
              isFavorite
                ? "opacity-100 text-red-500 hover:text-red-600"
                : "opacity-0 group-hover:opacity-100"
            }`}
            onClick={handleToggleFavorite}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">{product.league}</div>
          <h3 className="line-clamp-1">{product.name}</h3>
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
            {t.sizes}: {product.sizes.join(", ")}
          </div>
        </div>

        <Button className="w-full gap-2" onClick={handleAddToCart}>
          <ShoppingCart className="w-4 h-4" />
          {t.addToCart}
        </Button>
      </CardContent>

      {/* Customization Dialog */}
      <Dialog open={showCustomization} onOpenChange={setShowCustomization}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t.product.customizeProduct}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Product Info */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4>{product.name}</h4>
                <p className="text-sm text-gray-600">{product.team}</p>
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-2">
              <Label>{t.product.selectSize}</Label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger>
                  <SelectValue placeholder={t.product.chooseSize} />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Personalization Options */}
            <div className="space-y-3">
              <Label>{t.product.personalization}</Label>
              <RadioGroup
                value={personalization}
                onValueChange={setPersonalization}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none" className="flex-1">
                    {t.product.personalizationOptions.none}
                    <span className="text-green-600 ml-2">
                      {t.product.free}
                    </span>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="number-name" id="number-name" />
                  <Label htmlFor="number-name" className="flex-1">
                    {t.product.personalizationOptions.numberName}
                    <span className="text-blue-600 ml-2">+€15</span>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="number-name-patch"
                    id="number-name-patch"
                  />
                  <Label htmlFor="number-name-patch" className="flex-1">
                    {t.product.personalizationOptions.numberNamePatch}
                    <span className="text-blue-600 ml-2">+€25</span>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="patch-only" id="patch-only" />
                  <Label htmlFor="patch-only" className="flex-1">
                    {t.product.personalizationOptions.patchOnly}
                    <span className="text-blue-600 ml-2">+€10</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Player Name and Number inputs */}
            {(personalization === "number-name" ||
              personalization === "number-name-patch") && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="playerNumber">
                      {t.product.playerNumber}
                    </Label>
                    <input
                      id="playerNumber"
                      type="text"
                      value={playerNumber}
                      onChange={(e) => setPlayerNumber(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="10"
                      maxLength={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="playerName">{t.product.playerName}</Label>
                    <input
                      id="playerName"
                      type="text"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="MESSI"
                      maxLength={12}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Price Summary */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span>{t.product.basePrice}</span>
                <span>€{product.price}</span>
              </div>
              {getPersonalizationPrice() > 0 && (
                <div className="flex justify-between items-center mb-2">
                  <span>{t.product.personalizationPrice}</span>
                  <span>€{getPersonalizationPrice()}</span>
                </div>
              )}
              <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                <span>{t.common.total}</span>
                <span>€{getTotalPrice()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowCustomization(false)}
                className="flex-1"
              >
                {t.common.cancel}
              </Button>
              <Button onClick={handleConfirmAddToCart} className="flex-1">
                {t.product.addToCart}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
