import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Link } from "react-router";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl md:text-7xl font-bold leading-tight">
              Las mejores camisetas de fútbol
            </h2>
            <p className="text-xl text-purple-100 leading-relaxed">
              Encuentra las camisetas oficiales de tus equipos favoritos.
              Personaliza con nombre, número y parches. Calidad garantizada y
              envío rápido.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/catalog">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-4 w-full sm:w-auto"
                >
                  Ver catálogo
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-purple-900"
              >
                Ofertas especiales
              </Button>
            </div>
          </div>

          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1659081469066-c88ca2dec240?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHNvY2NlciUyMGplcnNleSUyMHNoaXJ0fGVufDF8fHx8MTc1OTQ3NDM3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Camisetas de fútbol"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
