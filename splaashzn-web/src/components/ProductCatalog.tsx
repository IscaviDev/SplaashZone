import { useState, useMemo } from "react";
import { ProductCard, Product, ProductCartItem } from "./ProductCard";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { Filter, Grid, List } from "lucide-react";
import { Badge } from "./ui/badge";
import { useTranslation } from "./hooks/useTranslation";

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (item: ProductCartItem) => void;
  onToggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  searchQuery: string;
}

export function ProductCatalog({
  products,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
  searchQuery,
}: ProductCatalogProps) {
  const [selectedLeague, setSelectedLeague] = useState<string>("all");
  const [selectedTeam, setSelectedTeam] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const { t } = useTranslation();

  // Get unique leagues and teams
  const leagues = useMemo(() => {
    const uniqueLeagues = [...new Set(products.map((p) => p.league))];
    return uniqueLeagues.sort();
  }, [products]);

  const teams = useMemo(() => {
    const uniqueTeams = [...new Set(products.map((p) => p.team))];
    return uniqueTeams.sort();
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.league.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by league
    if (selectedLeague !== "all") {
      filtered = filtered.filter(
        (product) => product.league === selectedLeague
      );
    }

    // Filter by team
    if (selectedTeam !== "all") {
      filtered = filtered.filter((product) => product.team === selectedTeam);
    }

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "team":
          return a.team.localeCompare(b.team);
        default:
          return 0;
      }
    });

    return sorted;
  }, [products, searchQuery, selectedLeague, selectedTeam, sortBy]);

  const clearFilters = () => {
    setSelectedLeague("all");
    setSelectedTeam("all");
    setSortBy("name");
  };

  const hasActiveFilters =
    selectedLeague !== "all" || selectedTeam !== "all" || sortBy !== "name";

  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">{t.catalogTitle}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.catalogDescription}
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter className="w-4 h-4" />
                {t.filters}
              </Button>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-sm"
                >
                  {t.clearFilters}
                </Button>
              )}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {filteredAndSortedProducts.length} productos
              </span>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white rounded-lg border">
              <div>
                <label className="block text-sm mb-2">{t.league}</label>
                <Select
                  value={selectedLeague}
                  onValueChange={setSelectedLeague}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t.allLeagues} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.allLeagues}</SelectItem>
                    {leagues.map((league) => (
                      <SelectItem key={league} value={league}>
                        {league}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm mb-2">{t.team}</label>
                <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.allTeams} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.allTeams}</SelectItem>
                    {teams.map((team) => (
                      <SelectItem key={team} value={team}>
                        {team}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm mb-2">{t.sortBy}</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">{t.name}</SelectItem>
                    <SelectItem value="team">{t.team}</SelectItem>
                    <SelectItem value="price-low">{t.priceLowest}</SelectItem>
                    <SelectItem value="price-high">{t.priceHighest}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {selectedLeague !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {t.league}: {selectedLeague}
                  <button
                    onClick={() => setSelectedLeague("all")}
                    className="ml-1 hover:text-red-500"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedTeam !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {t.team}: {selectedTeam}
                  <button
                    onClick={() => setSelectedTeam("all")}
                    className="ml-1 hover:text-red-500"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1 max-w-4xl mx-auto"
            }`}
          >
            {filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onToggleFavorite={onToggleFavorite}
                isFavorite={isFavorite(product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t.noProducts}</p>
            <Button variant="outline" onClick={clearFilters} className="mt-4">
              {t.showAllProducts}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
