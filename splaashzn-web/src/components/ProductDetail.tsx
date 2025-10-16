import { useState } from "react";
import { X, Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Product, PersonalizationOption } from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductDetailProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    selectedSize: string,
    quantity: number,
    personalization?: {
      option: PersonalizationOption;
      playerName?: string;
      playerNumber?: string;
      customText?: string;
    }
  ) => void;
}

export function ProductDetail({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedPersonalization, setSelectedPersonalization] =
    useState<PersonalizationOption | null>(null);
  const [playerName, setPlayerName] = useState("");
  const [playerNumber, setPlayerNumber] = useState("");
  const [customText, setCustomText] = useState("");

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    if (selectedSize) {
      const personalizationData = selectedPersonalization
        ? {
            option: selectedPersonalization,
            playerName: playerName || undefined,
            playerNumber: playerNumber || undefined,
            customText: customText || undefined,
          }
        : undefined;

      onAddToCart(product, selectedSize, quantity, personalizationData);
      onClose();
      setSelectedSize("");
      setQuantity(1);
      setSelectedPersonalization(null);
      setPlayerName("");
      setPlayerNumber("");
      setCustomText("");
    }
  };

  const getPersonalizationPrice = () => {
    return selectedPersonalization ? selectedPersonalization.price : 0;
  };

  const getTotalPrice = () => {
    return (product.price + getPersonalizationPrice()) * quantity;
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <>
      <div className="fixed top-0 left-0 z-30 w-full h-[100vh] bg-black/20 backdrop-blur-sm" />
      <div className="fixed h-[75vh] w-[125vh] top-[12.5vh] left-[37.5vh] items-center justify-center z-50 overflow-hidden">
        <div className=" bg-black/50" onClick={onClose} />
        <div className="absolute inset-4 bg-background rounded-lg overflow-hidden">
          <div className="flex h-full">
            <div className="flex-1 flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-6">
                <div className="relative flex justify-center items-center min-h-full">
                  <Carousel className="max-w-xl max-h-xl">
                    <CarouselContent>
                      <CarouselItem className="flex items-center justify-center">
                        <ImageWithFallback
                          src={product.image[0]}
                          alt={product.name}
                          className="rounded-lg"
                        />
                      </CarouselItem>
                      <CarouselItem className="flex items-center justify-center">
                        <ImageWithFallback
                          src={product.image[1]}
                          alt={product.name}
                          className="rounded-lg"
                        />
                      </CarouselItem>
                    </CarouselContent>
                    {/* <div className="relative"> */}
                    <CarouselPrevious className="left-[35%] top-[108%]" />
                    <CarouselNext className="right-[35%] top-[108%]" />
                    {/* <CarouselPrevious />
                    <CarouselNext /> */}
                    {/* </div> */}
                  </Carousel>
                  {/* 
                <ImageWithFallback
                  src={product.image[0]}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                /> */}

                  {discount > 0 && (
                    <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                      -{discount}%
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-3 z-10"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="lg:w-1/2 p-6 overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                    <p className="text-xl text-muted-foreground">
                      {product.team}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-bold text-primary">
                      €{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        €{product.originalPrice}
                      </span>
                    )}
                    {discount > 0 && (
                      <Badge variant="destructive">
                        Ahorras €
                        {(product.originalPrice! - product.price).toFixed(2)}
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Talla:</h3>
                      <RadioGroup
                        value={selectedSize}
                        onValueChange={setSelectedSize}
                      >
                        <div className="grid grid-cols-4 gap-2">
                          {product.sizes.map((size) => (
                            <div key={size} className="flex items-center">
                              <RadioGroupItem
                                value={size}
                                id={size}
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor={size}
                                className={`flex items-center justify-center h-10 w-full border-2 rounded-lg cursor-pointer transition-all duration-200 font-semibold ${
                                  selectedSize === size
                                    ? "border-primary bg-primary text-primary-foreground shadow-lg scale-105 ring-2 ring-primary/30"
                                    : "border-border hover:border-primary/50 hover:bg-primary/5"
                                }`}
                              >
                                {size}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-3">Personalización:</h3>
                      <RadioGroup
                        value={selectedPersonalization?.id || ""}
                        onValueChange={(value) => {
                          const option = product.personalizationOptions.find(
                            (opt) => opt.id === value
                          );
                          setSelectedPersonalization(option || null);
                          if (!option) {
                            setPlayerName("");
                            setPlayerNumber("");
                            setCustomText("");
                          }
                        }}
                      >
                        <div className="space-y-2">
                          <div
                            className={`flex items-center space-x-3 p-3 border rounded-lg transition-all duration-200 cursor-pointer ${
                              !selectedPersonalization
                                ? "border-primary bg-primary/10 shadow-md"
                                : "border-border hover:border-primary/50 hover:bg-primary/5"
                            }`}
                          >
                            <RadioGroupItem value="" id="no-personalization" />
                            <Label
                              htmlFor="no-personalization"
                              className="flex-1 cursor-pointer"
                            >
                              <div className="font-medium">
                                Sin personalización
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Camiseta tal como viene
                              </div>
                            </Label>
                            <span className="font-semibold">€0</span>
                          </div>

                          {product.personalizationOptions.map((option) => (
                            <div
                              key={option.id}
                              className={`flex items-center space-x-3 p-3 border rounded-lg transition-all duration-200 cursor-pointer ${
                                selectedPersonalization?.id === option.id
                                  ? "border-primary bg-primary/10 shadow-md"
                                  : "border-border hover:border-primary/50 hover:bg-primary/5"
                              }`}
                            >
                              <RadioGroupItem
                                value={option.id}
                                id={option.id}
                              />
                              <Label
                                htmlFor={option.id}
                                className="flex-1 cursor-pointer"
                              >
                                <div className="font-medium">{option.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {option.description}
                                </div>
                              </Label>
                              <span className="font-semibold text-primary">
                                +€{option.price}
                              </span>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>

                      {selectedPersonalization && (
                        <div className="mt-4 p-4 bg-muted/30 border border-border rounded-lg space-y-3">
                          <h4 className="font-medium">
                            Detalles de personalización:
                          </h4>

                          {(selectedPersonalization.id === "name-number" ||
                            selectedPersonalization.id ===
                              "name-number-patch") && (
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label
                                  htmlFor="player-name"
                                  className="text-sm"
                                >
                                  Nombre del jugador
                                </Label>
                                <Input
                                  id="player-name"
                                  placeholder="Ej: MESSI"
                                  value={playerName}
                                  onChange={(e) =>
                                    setPlayerName(e.target.value.toUpperCase())
                                  }
                                  maxLength={12}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label
                                  htmlFor="player-number"
                                  className="text-sm"
                                >
                                  Número
                                </Label>
                                <Input
                                  id="player-number"
                                  placeholder="Ej: 10"
                                  value={playerNumber}
                                  onChange={(e) =>
                                    setPlayerNumber(e.target.value)
                                  }
                                  maxLength={2}
                                  type="number"
                                  min="1"
                                  max="99"
                                  className="mt-1"
                                />
                              </div>
                            </div>
                          )}

                          {selectedPersonalization.id === "patch-only" && (
                            <div>
                              <Label htmlFor="custom-text" className="text-sm">
                                Texto personalizado
                              </Label>
                              <Textarea
                                id="custom-text"
                                placeholder="Texto para el parche (máx. 20 caracteres)"
                                value={customText}
                                onChange={(e) => setCustomText(e.target.value)}
                                maxLength={20}
                                className="mt-1 h-16 resize-none"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-3">Cantidad:</h3>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-semibold">
                          {quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {selectedPersonalization &&
                      getPersonalizationPrice() > 0 && (
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span>Precio base:</span>
                            <span className="font-semibold">
                              €{product.price.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <span>Personalización:</span>
                            <span className="font-semibold text-primary">
                              +€{getPersonalizationPrice().toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center font-bold text-lg border-t border-primary/30 pt-2">
                            <span>Total por unidad:</span>
                            <span className="text-primary">
                              €
                              {(
                                product.price + getPersonalizationPrice()
                              ).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      )}

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleAddToCart}
                      disabled={!selectedSize || !product.inStock}
                    >
                      {!product.inStock
                        ? "No disponible"
                        : !selectedSize
                        ? "Selecciona una talla"
                        : `Añadir al carrito - €${getTotalPrice().toFixed(2)}`}
                    </Button>

                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>✓ Envío gratis a partir de €50</p>
                      <p>✓ Devoluciones gratuitas hasta 30 días</p>
                      <p>✓ Producto 100% oficial</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold">Descripción del producto:</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Camiseta oficial del {product.team}. Fabricada con
                      tecnología Dri-FIT que ayuda a mantener la piel seca y
                      cómoda. Diseño auténtico con los colores y escudo del
                      equipo. Material 100% poliéster reciclado.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
