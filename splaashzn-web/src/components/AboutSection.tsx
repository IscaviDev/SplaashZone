import { Shield, Truck, Award, Users } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export function AboutSection() {
  const features = [
    {
      icon: Shield,
      title: "Calidad Garantizada",
      description: "Productos 100% oficiales de las mejores marcas deportivas del mundo."
    },
    {
      icon: Truck,
      title: "Envío Rápido",
      description: "Entrega en 24-48h en península. Envío gratuito en pedidos superiores a €50."
    },
    {
      icon: Award,
      title: "Personalización Premium",
      description: "Añade nombre, número y parches oficiales con la mejor tecnología de estampado."
    },
    {
      icon: Users,
      title: "Más de 50,000 Clientes",
      description: "Miles de aficionados confían en nosotros para vestir los colores de su equipo."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">¿Por qué elegir FutbolShop?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Somos especialistas en camisetas de fútbol con más de 10 años de experiencia. 
            Ofrecemos productos oficiales de la máxima calidad con el mejor servicio al cliente.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary to-purple-600 text-white rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Nuestra Historia</h3>
              <p className="text-lg leading-relaxed mb-6">
                Fundada en 2014 por verdaderos amantes del fútbol, FutbolShop nació con la misión 
                de acercar las camisetas oficiales de los mejores equipos del mundo a todos los aficionados. 
                Desde entonces, hemos crecido hasta convertirnos en la tienda de referencia en España.
              </p>
              <p className="text-lg leading-relaxed">
                Trabajamos directamente con Nike, Adidas, Puma y otras grandes marcas para garantizar 
                la autenticidad de cada producto. Nuestro equipo de expertos selecciona cuidadosamente 
                cada artículo para ofrecerte solo lo mejor.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">50K+</div>
                <div className="text-sm">Clientes satisfechos</div>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-sm">Modelos disponibles</div>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">10</div>
                <div className="text-sm">Años de experiencia</div>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">98%</div>
                <div className="text-sm">Valoración positiva</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}