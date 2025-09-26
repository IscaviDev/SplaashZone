import { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { useTranslation } from "./hooks/useTranslation";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";
import { CheckCircle, CreditCard, User } from "lucide-react";

interface CheckoutProps {
  items: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    size?: string;
    personalization?: string;
  }>;
  total: number;
  onClose: () => void;
  onSuccess: () => void;
}

const CheckoutForm = ({ items, total, onClose, onSuccess }: CheckoutProps) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [billingDetails, setBillingDetails] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    postalCode: "",
    country: "ES",
  });

  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const getAccessToken = async () => {
    // This would get the actual access token from Supabase auth
    // For now, using the anon key
    return publicAnonKey;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate form
    if (
      !billingDetails.name ||
      !billingDetails.email ||
      !billingDetails.address
    ) {
      setError("Por favor, completa todos los campos requeridos");
      setLoading(false);
      return;
    }

    if (paymentMethod === "card") {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvc) {
        setError("Por favor, completa la información de la tarjeta");
        setLoading(false);
        return;
      }
    }

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      // Save order to database
      const token = user ? await getAccessToken() : publicAnonKey;

      const orderData = {
        items,
        total,
        billingDetails,
        paymentMethod,
        customerEmail: billingDetails.email,
      };

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-184c0171/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 2000);
      } else {
        throw new Error("Error saving order");
      }
    } catch (error) {
      console.error("Error processing order:", error);
      setError("Error al procesar el pedido. Por favor, inténtalo de nuevo.");
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-700 mb-2">
          {t.checkout.paymentSuccess}
        </h3>
        <p className="text-gray-600">{t.checkout.orderConfirmation}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Billing Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            {t.checkout.billingInformation}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">{t.checkout.fullName}</Label>
              <Input
                id="name"
                name="name"
                value={billingDetails.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">{t.checkout.email}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={billingDetails.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">{t.checkout.address}</Label>
            <Input
              id="address"
              name="address"
              value={billingDetails.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">{t.checkout.city}</Label>
              <Input
                id="city"
                name="city"
                value={billingDetails.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="postalCode">{t.checkout.postalCode}</Label>
              <Input
                id="postalCode"
                name="postalCode"
                value={billingDetails.postalCode}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            {t.checkout.paymentInformation}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>Método de pago</Label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`flex items-center space-x-2 p-3 border rounded-lg ${
                  paymentMethod === "card"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <CreditCard className="h-4 w-4" />
                <span>Tarjeta</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("paypal")}
                className={`flex items-center space-x-2 p-3 border rounded-lg ${
                  paymentMethod === "paypal"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <span>PayPal</span>
              </button>
            </div>
          </div>

          {paymentMethod === "card" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Número de tarjeta</Label>
                <Input
                  id="cardNumber"
                  name="number"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.number}
                  onChange={handleCardInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cardExpiry">Vencimiento</Label>
                  <Input
                    id="cardExpiry"
                    name="expiry"
                    placeholder="MM/AA"
                    value={cardDetails.expiry}
                    onChange={handleCardInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cardCvc">CVC</Label>
                  <Input
                    id="cardCvc"
                    name="cvc"
                    placeholder="123"
                    value={cardDetails.cvc}
                    onChange={handleCardInputChange}
                    required
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>{t.checkout.orderSummary}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">
                  {item.size && `${t.common.size}: ${item.size}`}
                  {item.personalization && ` | ${item.personalization}`}
                  {item.quantity > 1 &&
                    ` | ${t.common.quantity}: ${item.quantity}`}
                </p>
              </div>
              <p className="font-medium">
                €{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between items-center font-bold text-lg">
            <span>{t.common.total}</span>
            <span>€{total.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="flex-1"
          disabled={loading}
        >
          {t.common.cancel}
        </Button>
        <Button type="submit" className="flex-1" disabled={loading}>
          {loading
            ? t.checkout.processing
            : `${t.checkout.pay} €${total.toFixed(2)}`}
        </Button>
      </div>
    </form>
  );
};

export const Checkout = (props: CheckoutProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <CheckoutForm {...props} />
      </div>
    </div>
  );
};
