import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { Star, Shield, Truck, Award } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 text-white min-h-screen flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1549923015-badf41b04831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBmb290YmFsbCUyMHN0YWRpdW0lMjBjcm93ZHxlbnwxfHx8fDE3NTk0NzY5NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Stadium background"
          className="w-full h-full object-cover opacity-20"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-teal-800/85 to-cyan-900/90"></div> */}
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-emerald-200 backdrop-blur-sm">
              <Star className="w-4 h-4 mr-2 fill-current" />
              <span className="text-sm">La tienda oficial de Splaashzn</span>
            </div>

            {/* Main Title */}
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-200">
                  SPLAASH
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">
                  ZONE
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-emerald-100 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Descubre la colección más completa de camisetas de fútbol.
                <span className="text-emerald-300 font-semibold">
                  {" "}
                  Más de 650 productos
                </span>{" "}
                de las mejores ligas del mundo.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <div className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Shield className="w-4 h-4 mr-2 text-emerald-300" />
                <span className="text-sm">Mejores precios </span>
              </div>
              <div className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Truck className="w-4 h-4 mr-2 text-emerald-300" />
                <span className="text-sm">Envío Gratis</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Award className="w-4 h-4 mr-2 text-emerald-300" />
                <span className="text-sm">Personalización</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link to="/catalog">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 hover:from-emerald-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-lg text-lg px-8 py-4 w-full sm:w-auto"
                >
                  Explorar Catálogo
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white hover:text-emerald-900 transform hover:scale-105 transition-all duration-300 text-lg px-8 py-4"
              >
                Ver Destacados
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-300">650+</div>
                <div className="text-sm text-emerald-100">Productos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-300">50+</div>
                <div className="text-sm text-emerald-100">Equipos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-300">15+</div>
                <div className="text-sm text-emerald-100">Ligas</div>
              </div>
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className="relative">
            <div className="relative">
              {/* Main Image */}
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1551479460-5e76c686816a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGplcnNleSUyMHNoaXJ0JTIwY29sbGVjdGlvbnxlbnwxfHx8fDE3NTk0NzY5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Colección de camisetas"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-emerald-500 text-white px-4 py-2 rounded-full shadow-lg animate-bounce">
                  <span className="text-sm font-semibold">¡Nuevo!</span>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-6 py-3 rounded-full shadow-lg">
                  <span className="text-sm font-semibold">Personalizable</span>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 top-10 -right-10 w-72 h-72 bg-gradient-to-br from-emerald-400/30 to-teal-400/30 rounded-full blur-3xl"></div>
              <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 bg-gradient-to-br from-cyan-400/30 to-emerald-400/30 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
