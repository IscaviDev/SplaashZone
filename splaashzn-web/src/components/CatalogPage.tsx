import { useState, useMemo } from "react";
import { Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard, Product, PersonalizationOption } from "./ProductCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
interface CatalogPageProps {
  products: Product[];
  cartItemCount: number;
  onCartClick: () => void;
  onUserClick: () => void;
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
  onUserClick,
  onSearchChange,
  searchQuery,
  onAddToCart,
  onProductClick,
}: CatalogPageProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedLeagues, setSelectedLeagues] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedJerseyTypes, setSelectedJerseyTypes] = useState<string[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [priceRanges, setPriceRanges] = useState<string[]>([]);
  const [availabilities, setAvailabilities] = useState<string[]>([]);
  const [sortBys, setSortBys] = useState<string[]>(["name"]);
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
        selectedTeams.length === 0 || selectedTeams.includes(product.team);
      const matchesLeague =
        selectedLeagues.length === 0 ||
        selectedLeagues.includes(product.league);
      const matchesCountry =
        selectedCountries.length === 0 ||
        selectedCountries.includes(product.country);
      const matchesJerseyType =
        selectedJerseyTypes.length === 0 ||
        selectedJerseyTypes.includes(product.jerseyType);
      const matchesSeason =
        selectedSeasons.length === 0 ||
        selectedSeasons.includes(product.season);

      const matchesPrice =
        priceRanges.length === 0 ||
        priceRanges.some(
          (range) =>
            (range === "under-60" && product.price < 60) ||
            (range === "60-80" && product.price >= 60 && product.price <= 80) ||
            (range === "80-100" &&
              product.price >= 80 &&
              product.price <= 100) ||
            (range === "over-100" && product.price > 100)
        );

      const matchesAvailability =
        availabilities.length === 0 ||
        availabilities.some(
          (avail) =>
            (avail === "in-stock" && product.inStock) ||
            (avail === "out-of-stock" && !product.inStock)
        );

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
    const sortBy = sortBys.length > 0 ? sortBys[0] : "name";
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
    selectedTeams,
    selectedLeagues,
    selectedCountries,
    selectedJerseyTypes,
    selectedSeasons,
    priceRanges,
    availabilities,
    sortBys,
  ]);

  // Get current page products
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const clearFilters = () => {
    setLocalSearchQuery("");
    setSelectedTeams([]);
    setSelectedLeagues([]);
    setSelectedCountries([]);
    setSelectedJerseyTypes([]);
    setSelectedSeasons([]);
    setPriceRanges([]);
    setAvailabilities([]);
    setSortBys(["name"]);
    setCurrentPage(1);
  };

  const activeFiltersCount =
    (localSearchQuery ? 1 : 0) +
    (selectedTeams.length > 0 ? 1 : 0) +
    (selectedLeagues.length > 0 ? 1 : 0) +
    (selectedCountries.length > 0 ? 1 : 0) +
    (selectedJerseyTypes.length > 0 ? 1 : 0) +
    (selectedSeasons.length > 0 ? 1 : 0) +
    (priceRanges.length > 0 ? 1 : 0) +
    (availabilities.length > 0 ? 1 : 0);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemCount={cartItemCount}
        onCartClick={onCartClick}
        onUserClick={onUserClick}
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
                <MultiSelect
                  values={selectedLeagues}
                  onValuesChange={(values) => {
                    setSelectedLeagues(values);
                    setCurrentPage(1);
                  }}
                >
                  <MultiSelectTrigger className="w-full max-w-[400px]">
                    <MultiSelectValue placeholder="Seleccionar ligas..." />
                  </MultiSelectTrigger>
                  <MultiSelectContent>
                    <MultiSelectGroup>
                      {leagues.map((league) => (
                        <MultiSelectItem key={league!} value={league!}>
                          {league}
                        </MultiSelectItem>
                      ))}
                    </MultiSelectGroup>
                  </MultiSelectContent>
                </MultiSelect>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Equipo</label>
                <MultiSelect
                  values={selectedTeams}
                  onValuesChange={(values) => {
                    setSelectedTeams(values);
                    setCurrentPage(1);
                  }}
                >
                  <MultiSelectTrigger className="w-full max-w-[400px]">
                    <MultiSelectValue placeholder="Seleccionar equipos..." />
                  </MultiSelectTrigger>
                  <MultiSelectContent>
                    <MultiSelectGroup>
                      {teams.map((team) => (
                        <MultiSelectItem key={team} value={team}>
                          {team}
                        </MultiSelectItem>
                      ))}
                    </MultiSelectGroup>
                  </MultiSelectContent>
                </MultiSelect>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">País</label>
                <MultiSelect
                  values={selectedCountries}
                  onValuesChange={(values) => {
                    setSelectedCountries(values);
                    setCurrentPage(1);
                  }}
                >
                  <MultiSelectTrigger className="w-full max-w-[400px]">
                    <MultiSelectValue placeholder="Seleccionar países..." />
                  </MultiSelectTrigger>
                  <MultiSelectContent>
                    <MultiSelectGroup>
                      {countries.map((country) => (
                        <MultiSelectItem key={country!} value={country!}>
                          {country}
                        </MultiSelectItem>
                      ))}
                    </MultiSelectGroup>
                  </MultiSelectContent>
                </MultiSelect>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Tipo</label>
                <MultiSelect
                  values={selectedJerseyTypes}
                  onValuesChange={(values) => {
                    setSelectedJerseyTypes(values);
                    setCurrentPage(1);
                  }}
                >
                  <MultiSelectTrigger className="w-full max-w-[400px]">
                    <MultiSelectValue placeholder="Seleccionar tipos..." />
                  </MultiSelectTrigger>
                  <MultiSelectContent>
                    <MultiSelectGroup>
                      {jerseyTypes.map((type) => (
                        <MultiSelectItem key={type!} value={type!}>
                          {type}
                        </MultiSelectItem>
                      ))}
                    </MultiSelectGroup>
                  </MultiSelectContent>
                </MultiSelect>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Temporada
                </label>
                <MultiSelect
                  values={selectedSeasons}
                  onValuesChange={(values) => {
                    setSelectedSeasons(values);
                    setCurrentPage(1);
                  }}
                >
                  <MultiSelectTrigger className="w-full max-w-[400px]">
                    <MultiSelectValue placeholder="Seleccionar temporadas..." />
                  </MultiSelectTrigger>
                  <MultiSelectContent>
                    <MultiSelectGroup>
                      {seasons.map((season) => (
                        <MultiSelectItem key={season!} value={season!}>
                          {season}
                        </MultiSelectItem>
                      ))}
                    </MultiSelectGroup>
                  </MultiSelectContent>
                </MultiSelect>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Precio</label>
                <MultiSelect
                  values={priceRanges}
                  onValuesChange={(values) => {
                    setPriceRanges(values);
                    setCurrentPage(1);
                  }}
                >
                  <MultiSelectTrigger className="w-full max-w-[400px]">
                    <MultiSelectValue placeholder="Seleccionar precios..." />
                  </MultiSelectTrigger>
                  <MultiSelectContent>
                    <MultiSelectGroup>
                      <MultiSelectItem value="under-60">
                        Menos de €60
                      </MultiSelectItem>
                      <MultiSelectItem value="60-80">€60 - €80</MultiSelectItem>
                      <MultiSelectItem value="80-100">
                        €80 - €100
                      </MultiSelectItem>
                      <MultiSelectItem value="over-100">
                        Más de €100
                      </MultiSelectItem>
                    </MultiSelectGroup>
                  </MultiSelectContent>
                </MultiSelect>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Disponibilidad
                </label>
                <MultiSelect
                  values={availabilities}
                  onValuesChange={(values) => {
                    setAvailabilities(values);
                    setCurrentPage(1);
                  }}
                >
                  <MultiSelectTrigger className="w-full max-w-[400px]">
                    <MultiSelectValue placeholder="Seleccionar disponibilidad..." />
                  </MultiSelectTrigger>
                  <MultiSelectContent>
                    <MultiSelectGroup>
                      <MultiSelectItem value="in-stock">
                        En stock
                      </MultiSelectItem>
                      <MultiSelectItem value="out-of-stock">
                        Agotado
                      </MultiSelectItem>
                    </MultiSelectGroup>
                  </MultiSelectContent>
                </MultiSelect>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Ordenar por
                </label>
                <MultiSelect
                  values={sortBys}
                  onValuesChange={(values) => {
                    setSortBys(values);
                  }}
                >
                  <MultiSelectTrigger className="w-full max-w-[400px]">
                    <MultiSelectValue placeholder="Seleccionar orden..." />
                  </MultiSelectTrigger>
                  <MultiSelectContent>
                    <MultiSelectGroup>
                      <MultiSelectItem value="name">Nombre A-Z</MultiSelectItem>
                      <MultiSelectItem value="team">Equipo</MultiSelectItem>
                      <MultiSelectItem value="league">Liga</MultiSelectItem>
                      <MultiSelectItem value="price-low">
                        Precio: menor a mayor
                      </MultiSelectItem>
                      <MultiSelectItem value="price-high">
                        Precio: mayor a menor
                      </MultiSelectItem>
                      <MultiSelectItem value="newest">
                        Más recientes
                      </MultiSelectItem>
                    </MultiSelectGroup>
                  </MultiSelectContent>
                </MultiSelect>
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
