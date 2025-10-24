import { useState, useMemo } from "react";
import { Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard, Product, PersonalizationOption } from "./ProductCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Header } from "./Header";
import {
  getUniqueTeams,
  getUniqueLeagues,
  getUniqueCountries,
  getUniqueJerseyTypes,
  getUniqueSeasons,
} from "../data/products";

interface CatalogPageProps {
  products: Product[];
  cartItemCount: number;
  onCartClick: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
  onAddToCart: (
    product: Product,
    selectedSize?: string,
    quantity?: number,
    personalization?: {
      option: PersonalizationOption;
      playerName?: string;
      playerNumber?: string;
      customText?: string;
    }
  ) => void;
  onProductClick: (product: Product) => void;
}

export function CatalogPage({
  products,
  cartItemCount,
  onCartClick,
  onSearchChange,
  searchQuery,
  onAddToCart,
  onProductClick,
}: CatalogPageProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [selectedLeague, setSelectedLeague] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedJerseyType, setSelectedJerseyType] = useState("all");
  const [selectedSeason, setSelectedSeason] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  // Get filter options
  const teams = getUniqueTeams();
  const leagues = getUniqueLeagues();
  const countries = getUniqueCountries();
  const jerseyTypes = getUniqueJerseyTypes();
  const seasons = getUniqueSeasons();

  // Filter and sort products
  const { filteredProducts, totalPages } = useMemo(() => {
    const filtered = products.filter((product) => {
      const searchTerm = localSearchQuery.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        product.name.toLowerCase().includes(searchTerm) ||
        product.team.toLowerCase().includes(searchTerm) ||
        product.league?.toLowerCase().includes(searchTerm) ||
        product.country?.toLowerCase().includes(searchTerm);

      const matchesTeam =
        selectedTeam === "all" || product.team === selectedTeam;
      const matchesLeague =
        selectedLeague === "all" || product.league === selectedLeague;
      const matchesCountry =
        selectedCountry === "all" || product.country === selectedCountry;
      const matchesJerseyType =
        selectedJerseyType === "all" ||
        product.jerseyType === selectedJerseyType;
      const matchesSeason =
        selectedSeason === "all" || product.season === selectedSeason;

      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "under-60" && product.price < 60) ||
        (priceRange === "60-80" &&
          product.price >= 60 &&
          product.price <= 80) ||
        (priceRange === "80-100" &&
          product.price >= 80 &&
          product.price <= 100) ||
        (priceRange === "over-100" && product.price > 100);

      const matchesAvailability =
        availability === "all" ||
        (availability === "in-stock" && product.inStock) ||
        (availability === "out-of-stock" && !product.inStock);

      return (
        matchesSearch &&
        matchesTeam &&
        matchesLeague &&
        matchesCountry &&
        matchesJerseyType &&
        matchesSeason &&
        matchesPrice &&
        matchesAvailability
      );
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "team":
          return a.team.localeCompare(b.team);
        case "league":
          return (a.league || "").localeCompare(b.league || "");
        case "newest":
          return (b.season || "").localeCompare(a.season || "");
        default:
          return a.name.localeCompare(b.name);
      }
    });

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    return { filteredProducts: filtered, totalPages };
  }, [
    products,
    localSearchQuery,
    selectedTeam,
    selectedLeague,
    selectedCountry,
    selectedJerseyType,
    selectedSeason,
    priceRange,
    availability,
    sortBy,
  ]);

  // Get current page products
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const clearFilters = () => {
    setLocalSearchQuery("");
    setSelectedTeam("all");
    setSelectedLeague("all");
    setSelectedCountry("all");
    setSelectedJerseyType("all");
    setSelectedSeason("all");
    setPriceRange("all");
    setAvailability("all");
    setSortBy("name");
    setCurrentPage(1);
  };

  const activeFiltersCount =
    (localSearchQuery ? 1 : 0) +
    (selectedTeam !== "all" ? 1 : 0) +
    (selectedLeague !== "all" ? 1 : 0) +
    (selectedCountry !== "all" ? 1 : 0) +
    (selectedJerseyType !== "all" ? 1 : 0) +
    (selectedSeason !== "all" ? 1 : 0) +
    (priceRange !== "all" ? 1 : 0) +
    (availability !== "all" ? 1 : 0);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemCount={cartItemCount}
        onCartClick={onCartClick}
        onSearchChange={onSearchChange}
        searchQuery={searchQuery}
      />

      {/* Header del catálogo */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 text-white py-16 w-full">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Catálogo de Camisetas</h1>
          <p className="text-xl text-purple-100 max-w-2xl">
            Explora nuestra colección completa de más de 650 camisetas oficiales
            de los mejores equipos del mundo
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filtros */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <h2 className="font-semibold">Filtros</h2>
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary">{activeFiltersCount}</Badge>
                )}
              </div>
              {activeFiltersCount > 0 && (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Limpiar filtros
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Buscar</label>
                <Input
                  placeholder="Buscar camisetas..."
                  value={localSearchQuery}
                  onChange={(e) => {
                    setLocalSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Liga</label>
                <Select
                  value={selectedLeague}
                  onValueChange={(value) => {
                    setSelectedLeague(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las ligas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las ligas</SelectItem>
                    {leagues.map((league) => (
                      <SelectItem key={league!} value={league!}>
                        {league}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Equipo</label>
                <Select
                  value={selectedTeam}
                  onValueChange={(value) => {
                    setSelectedTeam(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los equipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los equipos</SelectItem>
                    {teams.map((team) => (
                      <SelectItem key={team} value={team}>
                        {team}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">País</label>
                <Select
                  value={selectedCountry}
                  onValueChange={(value) => {
                    setSelectedCountry(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los países" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los países</SelectItem>
                    {countries.map((country) => (
                      <SelectItem key={country!} value={country!}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Tipo</label>
                <Select
                  value={selectedJerseyType}
                  onValueChange={(value) => {
                    setSelectedJerseyType(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    {jerseyTypes.map((type) => (
                      <SelectItem key={type!} value={type!}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Temporada
                </label>
                <Select
                  value={selectedSeason}
                  onValueChange={(value) => {
                    setSelectedSeason(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las temporadas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las temporadas</SelectItem>
                    {seasons.map((season) => (
                      <SelectItem key={season!} value={season!}>
                        {season}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Precio</label>
                <Select
                  value={priceRange}
                  onValueChange={(value) => {
                    setPriceRange(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los precios" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los precios</SelectItem>
                    <SelectItem value="under-60">Menos de €60</SelectItem>
                    <SelectItem value="60-80">€60 - €80</SelectItem>
                    <SelectItem value="80-100">€80 - €100</SelectItem>
                    <SelectItem value="over-100">Más de €100</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Disponibilidad
                </label>
                <Select
                  value={availability}
                  onValueChange={(value) => {
                    setAvailability(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="in-stock">En stock</SelectItem>
                    <SelectItem value="out-of-stock">Agotado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Ordenar por
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Nombre A-Z</SelectItem>
                    <SelectItem value="team">Equipo</SelectItem>
                    <SelectItem value="league">Liga</SelectItem>
                    <SelectItem value="price-low">
                      Precio: menor a mayor
                    </SelectItem>
                    <SelectItem value="price-high">
                      Precio: mayor a menor
                    </SelectItem>
                    <SelectItem value="newest">Más recientes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resultados */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            {filteredProducts.length} productos encontrados
            {filteredProducts.length > itemsPerPage && (
              <span>
                {" "}
                - Página {currentPage} de {totalPages}
              </span>
            )}
          </p>
        </div>

        {/* Grid de productos */}
        {currentProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onProductClick={onProductClick}
                />
              ))}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </Button>

                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={
                          currentPage === pageNum ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">
              No se encontraron productos que coincidan con los filtros
              seleccionados.
            </p>
            <Button onClick={clearFilters}>Limpiar filtros</Button>
          </div>
        )}
      </div>
    </div>
  );
}
