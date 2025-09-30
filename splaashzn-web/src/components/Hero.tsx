import { Button } from "./ui/button";
// import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTranslation } from "./hooks/useTranslation";
import heroimg from "../assets/heroPhoto.png";
export function Hero() {
  const { t } = useTranslation();
  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-blue-600 to-green-600 text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight">
                {t.heroTitle.split(" ").slice(0, 2).join(" ")}
                <span className="block text-yellow-300">{t.heroSubtitle}</span>
                {t.heroTitle.split(" ").slice(2).join(" ")}
              </h1>
              <p className="text-xl text-blue-100 max-w-xl">
                {t.heroDescription}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
                onClick={() =>
                  document
                    .getElementById("products")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {t.viewProducts}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-blue-600 hover:bg-gray-300 hover:text-blue-600"
              >
                {t.specialOffers}
              </Button>
            </div>

            <div className="flex items-center gap-8 text-sm">
              <div className="text-center">
                <div className="text-2xl">500+</div>
                <div className="text-blue-200">{t.productsCount}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl">50+</div>
                <div className="text-blue-200">{t.teamsCount}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl">24h</div>
                <div className="text-blue-200">{t.fastShipping}</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img src={heroimg} alt="" />
              {/* <ImageWithFallback
                src="https://images.unsplash.com/photo-1668791160369-d20b8175eab2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGplcnNleSUyMHNvY2NlciUyMHNoaXJ0fGVufDF8fHx8MTc1ODY2MzAzNnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt={t.heroTitle}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-2xl"
              /> */}
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center z-20">
              <span className="text-black text-sm">-20%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
