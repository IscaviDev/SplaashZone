import { useState } from "react";
import {
  ShoppingCart,
  Menu,
  X,
  Search,
  Heart,
  Globe,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTranslation, Language } from "./hooks/useTranslation";
import { useAuth } from "./hooks/useAuth";
import logo from "../assets/logo.png";

interface HeaderProps {
  cartItemCount: number;
  favoritesCount: number;
  onCartClick: () => void;
  onFavoritesClick: () => void;
  onSearchChange: (query: string) => void;
  onAuthClick: () => void;
}

export function Header({
  cartItemCount,
  favoritesCount,
  onCartClick,
  onFavoritesClick,
  onSearchChange,
  onAuthClick,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { t, language, switchLanguage } = useTranslation();
  const { user, logout } = useAuth();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  const handleLanguageSwitch = (newLanguage: Language) => {
    switchLanguage(newLanguage);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-primary">
              <img className="object-contain w-14" src={logo} alt="" />
            </h1>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() =>
                document
                  .getElementById("home")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-foreground hover:text-primary transition-colors"
            >
              {t.home}
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-foreground hover:text-primary transition-colors"
            >
              {t.products}
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-foreground hover:text-primary transition-colors"
            >
              {t.about}
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-foreground hover:text-primary transition-colors"
            >
              {t.contact}
            </button>
          </nav>

          {/* Language Switcher, User, Favorites, Cart and Mobile Menu */}
          <div className="flex items-center space-x-2">
            {/* Language Switcher */}
            {/* <div className="hidden sm:flex items-center space-x-1">
              <Button
                variant={language === 'es' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleLanguageSwitch('es')}
                className="h-8 px-2"
              >
                ES
              </Button>
              <Button
                variant={language === 'en' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleLanguageSwitch('en')}
                className="h-8 px-2"
              >
                EN
              </Button>
            </div> */}

            {/* User Account */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled>{user.name}</DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    {t.auth.logout}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="icon" onClick={onAuthClick}>
                <User className="w-5 h-5" />
              </Button>
            )}

            {/* Favorites */}
            <Button
              variant="outline"
              size="icon"
              onClick={onFavoritesClick}
              className="relative"
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {favoritesCount}
                </Badge>
              )}
            </Button>

            {/* Cart */}
            <Button
              variant="outline"
              size="icon"
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              <button
                className="text-foreground hover:text-primary transition-colors text-left"
                onClick={() => {
                  setIsMenuOpen(false);
                  document
                    .getElementById("home")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t.home}
              </button>
              <button
                className="text-foreground hover:text-primary transition-colors text-left"
                onClick={() => {
                  setIsMenuOpen(false);
                  document
                    .getElementById("products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t.products}
              </button>
              <button
                className="text-foreground hover:text-primary transition-colors text-left"
                onClick={() => {
                  setIsMenuOpen(false);
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t.about}
              </button>
              <button
                className="text-foreground hover:text-primary transition-colors text-left"
                onClick={() => {
                  setIsMenuOpen(false);
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t.contact}
              </button>
            </nav>

            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-center space-x-2 pt-4 border-t">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <Button
                variant={language === "es" ? "default" : "ghost"}
                size="sm"
                onClick={() => handleLanguageSwitch("es")}
                className="h-8 px-3"
              >
                Español
              </Button>
              <Button
                variant={language === "en" ? "default" : "ghost"}
                size="sm"
                onClick={() => handleLanguageSwitch("en")}
                className="h-8 px-3"
              >
                English
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
