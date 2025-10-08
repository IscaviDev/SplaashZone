import { Separator } from "./ui/separator";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Splaash Zone</h3>
            <p className="text-sm text-muted-foreground">
              Tu tienda de confianza para camisetas de fútbol oficiales. Calidad
              garantizada y los mejores precios.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Categorías</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  La Liga
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Premier League
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Serie A
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Bundesliga
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Selecciones
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Atención al cliente</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Envíos y devoluciones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Guía de tallas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Preguntas frecuentes
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Información</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Sobre nosotros
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Términos y condiciones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Política de privacidad
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Política de cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2024 SplaashZone. Todos los derechos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span>Métodos de pago: Visa, Mastercard, PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
