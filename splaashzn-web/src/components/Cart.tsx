import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  team: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
}

export function Cart({
  isOpen,
  onOpenChange,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartProps) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  // const shipping = totalPrice > 50 ? 0 : 5.99;
  const shipping = totalItems * 2.13;
  const taxes = totalItems * 0.55;
  const finalTotal = totalPrice + shipping;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col sm:max-w-lg px-4 py-4 w-full">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Carrito de Compras
            {totalItems > 0 && <Badge variant="secondary">{totalItems}</Badge>}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <ShoppingBag className="w-16 h-16 text-muted-foreground" />
              <div className="space-y-2">
                <h3>Tu carrito está vacío</h3>
                <p className="text-muted-foreground">
                  Añade algunos productos para comenzar tu compra
                </p>
              </div>
              <Button
                className="cursor-pointer"
                onClick={() => onOpenChange(false)}
              >
                Continuar Comprando
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="space-y-1">
                      <h4 className="text-sm line-clamp-2">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.team}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Talla: {item.size}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() =>
                            onUpdateQuantity(
                              item.id,
                              Math.max(0, item.quantity - 1)
                            )
                          }
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="text-sm">
                          €{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive cursor-pointer"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t pt-4 space-y-4 space-x-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal ({totalItems} artículos)</span>
                <span>€{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Envío</span>
                <span>{`€${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Impuestos</span>
                <span>{`€${taxes.toFixed(2)}`}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Total</span>
                <span>€{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                className="w-full cursor-pointer"
                size="lg"
                onClick={onCheckout}
              >
                Proceder al Pago
              </Button>
              <Button
                variant="outline"
                className="w-full cursor-pointer"
                onClick={() => onOpenChange(false)}
              >
                Continuar Comprando
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
