import { ShoppingCart, Search, Menu, UserRound } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Link } from "react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onUserClick: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export function Header({
  cartItemCount,
  onCartClick,
  onUserClick,
  onSearchChange,
  searchQuery,
}: HeaderProps) {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-primary">SplaashZN</h1>
            <nav className="hidden md:flex space-x-6">
              <Link
                to="/"
                className="text-foreground hover:text-primary transition-colors"
              >
                Inicio
              </Link>
              <Link
                to="/catalog"
                className="text-foreground hover:text-primary transition-colors"
              >
                Catálogo
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {/* <div className="relative hidden sm:block"> */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative cursor-pointer"
                  onClick={onUserClick}
                >
                  <UserRound className="h-4 w-4" />
                  {/* {cartItemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                      {cartItemCount}
                    </Badge>
                  )} */}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Account</TooltipContent>
            </Tooltip>
            {/* </div> */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative cursor-pointer"
                  onClick={onCartClick}
                >
                  <ShoppingCart className="h-4 w-4" />
                  {cartItemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Cart</TooltipContent>
            </Tooltip>
            {/* <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Menu</TooltipContent>
            </Tooltip> */}
          </div>
        </div>
      </div>
    </header>
  );
}
