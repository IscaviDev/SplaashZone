import { X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Product, PersonalizationOption } from "./ProductCard";

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  originalId?: string;
  personalization?: {
    option: PersonalizationOption;
    playerName?: string;
    playerNumber?: string;
    customText?: string;
  };
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartProps) {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold">
              Carrito ({itemCount} {itemCount === 1 ? 'artículo' : 'artículos'})
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-lg text-muted-foreground mb-4">
                  Tu carrito está vacío
                </p>
                <Button onClick={onClose}>Continuar comprando</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 p-4 border border-border rounded-lg">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    
                    <div className="flex-1 space-y-2">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.team}</p>
                      
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">
                          Talla {item.selectedSize}
                        </Badge>
                        
                        {item.personalization && (
                          <Badge variant="secondary" className="text-xs">
                            {item.personalization.option.name}
                          </Badge>
                        )}
                      </div>

                      {item.personalization && (
                        <div className="text-xs text-muted-foreground">
                          {item.personalization.playerName && (
                            <div>Nombre: {item.personalization.playerName}</div>
                          )}
                          {item.personalization.playerNumber && (
                            <div>Número: {item.personalization.playerNumber}</div>
                          )}
                          {item.personalization.customText && (
                            <div>Texto: {item.personalization.customText}</div>
                          )}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">€{(item.price * item.quantity).toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => onRemoveItem(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {items.length > 0 && (
            <div className="border-t border-border p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-xl font-bold text-primary">€{total.toFixed(2)}</span>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Button className="w-full" size="lg">
                  Proceder al pago
                </Button>
                <Button variant="outline" className="w-full" onClick={onClose}>
                  Continuar comprando
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}