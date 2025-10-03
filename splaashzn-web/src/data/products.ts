import { Product, PersonalizationOption } from "../components/ProductCard";

// Opciones de personalización disponibles
export const personalizationOptions: PersonalizationOption[] = [
  {
    id: "name-number",
    name: "Nombre + Número",
    price: 15.99,
    description: "Añade nombre y número del jugador al dorsal",
  },
  {
    id: "name-number-patch",
    name: "Nombre + Número + Parche",
    price: 24.99,
    description: "Nombre, número y parche oficial de la liga",
  },
  {
    id: "patch-only",
    name: "Solo Parche",
    price: 9.99,
    description: "Parche personalizado o de liga oficial",
  },
];

// Teams data structure
const teamsData = [
  // La Liga
  {
    name: "Real Madrid",
    league: "La Liga",
    country: "España",
    priceRange: [85, 120],
  },
  {
    name: "FC Barcelona",
    league: "La Liga",
    country: "España",
    priceRange: [85, 120],
  },
  {
    name: "Atlético de Madrid",
    league: "La Liga",
    country: "España",
    priceRange: [75, 105],
  },
  {
    name: "Sevilla FC",
    league: "La Liga",
    country: "España",
    priceRange: [65, 95],
  },
  {
    name: "Real Betis",
    league: "La Liga",
    country: "España",
    priceRange: [60, 90],
  },
  {
    name: "Valencia CF",
    league: "La Liga",
    country: "España",
    priceRange: [65, 95],
  },
  {
    name: "Athletic Bilbao",
    league: "La Liga",
    country: "España",
    priceRange: [70, 100],
  },
  {
    name: "Real Sociedad",
    league: "La Liga",
    country: "España",
    priceRange: [65, 95],
  },
  {
    name: "Villarreal CF",
    league: "La Liga",
    country: "España",
    priceRange: [65, 95],
  },
  {
    name: "Getafe CF",
    league: "La Liga",
    country: "España",
    priceRange: [55, 85],
  },

  // Premier League
  {
    name: "Manchester United",
    league: "Premier League",
    country: "Inglaterra",
    priceRange: [80, 115],
  },
  {
    name: "Manchester City",
    league: "Premier League",
    country: "Inglaterra",
    priceRange: [80, 115],
  },
  {
    name: "Liverpool FC",
    league: "Premier League",
    country: "Inglaterra",
    priceRange: [80, 115],
  },
  {
    name: "Chelsea FC",
    league: "Premier League",
    country: "Inglaterra",
    priceRange: [80, 115],
  },
  {
    name: "Arsenal FC",
    league: "Premier League",
    country: "Inglaterra",
    priceRange: [80, 115],
  },
  {
    name: "Tottenham",
    league: "Premier League",
    country: "Inglaterra",
    priceRange: [75, 110],
  },
  {
    name: "Newcastle United",
    league: "Premier League",
    country: "Inglaterra",
    priceRange: [70, 100],
  },
  {
    name: "Brighton",
    league: "Premier League",
    country: "Inglaterra",
    priceRange: [60, 90],
  },
  {
    name: "Aston Villa",
    league: "Premier League",
    country: "Inglaterra",
    priceRange: [65, 95],
  },
  {
    name: "West Ham",
    league: "Premier League",
    country: "Inglaterra",
    priceRange: [65, 95],
  },

  // Serie A
  {
    name: "Juventus",
    league: "Serie A",
    country: "Italia",
    priceRange: [75, 110],
  },
  {
    name: "AC Milan",
    league: "Serie A",
    country: "Italia",
    priceRange: [75, 110],
  },
  {
    name: "Inter Milan",
    league: "Serie A",
    country: "Italia",
    priceRange: [75, 110],
  },
  {
    name: "AS Roma",
    league: "Serie A",
    country: "Italia",
    priceRange: [70, 100],
  },
  {
    name: "SSC Napoli",
    league: "Serie A",
    country: "Italia",
    priceRange: [70, 100],
  },
  { name: "Lazio", league: "Serie A", country: "Italia", priceRange: [65, 95] },
  {
    name: "Atalanta",
    league: "Serie A",
    country: "Italia",
    priceRange: [60, 90],
  },
  {
    name: "Fiorentina",
    league: "Serie A",
    country: "Italia",
    priceRange: [60, 90],
  },

  // Bundesliga
  {
    name: "Bayern München",
    league: "Bundesliga",
    country: "Alemania",
    priceRange: [80, 115],
  },
  {
    name: "Borussia Dortmund",
    league: "Bundesliga",
    country: "Alemania",
    priceRange: [75, 110],
  },
  {
    name: "RB Leipzig",
    league: "Bundesliga",
    country: "Alemania",
    priceRange: [65, 95],
  },
  {
    name: "Bayer Leverkusen",
    league: "Bundesliga",
    country: "Alemania",
    priceRange: [65, 95],
  },
  {
    name: "Eintracht Frankfurt",
    league: "Bundesliga",
    country: "Alemania",
    priceRange: [60, 90],
  },
  {
    name: "Borussia M'gladbach",
    league: "Bundesliga",
    country: "Alemania",
    priceRange: [60, 90],
  },

  // Ligue 1
  {
    name: "Paris Saint-Germain",
    league: "Ligue 1",
    country: "Francia",
    priceRange: [85, 120],
  },
  {
    name: "Olympique Marseille",
    league: "Ligue 1",
    country: "Francia",
    priceRange: [65, 95],
  },
  {
    name: "Olympique Lyon",
    league: "Ligue 1",
    country: "Francia",
    priceRange: [65, 95],
  },
  {
    name: "AS Monaco",
    league: "Ligue 1",
    country: "Francia",
    priceRange: [70, 100],
  },

  // Selecciones
  {
    name: "Selección Española",
    league: "Internacional",
    country: "España",
    priceRange: [80, 110],
  },
  {
    name: "Selección Francesa",
    league: "Internacional",
    country: "Francia",
    priceRange: [80, 110],
  },
  {
    name: "Selección Italiana",
    league: "Internacional",
    country: "Italia",
    priceRange: [80, 110],
  },
  {
    name: "Selección Alemana",
    league: "Internacional",
    country: "Alemania",
    priceRange: [80, 110],
  },
  {
    name: "Selección Inglesa",
    league: "Internacional",
    country: "Inglaterra",
    priceRange: [80, 110],
  },
  {
    name: "Selección Brasileña",
    league: "Internacional",
    country: "Brasil",
    priceRange: [85, 115],
  },
  {
    name: "Selección Argentina",
    league: "Internacional",
    country: "Argentina",
    priceRange: [85, 115],
  },
  {
    name: "Selección Portuguesa",
    league: "Internacional",
    country: "Portugal",
    priceRange: [80, 110],
  },
];

const jerseyTypes = [
  "Local",
  "Visitante",
  "Tercera equipación",
  "Portero",
  "Entrenamiento",
  "Retro 90s",
  "Retro 2000s",
  "Edición especial",
];

const seasons = ["2024/25", "2023/24", "2022/23", "Retro"];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

// Sample images for different team types
const sampleImages = [
  "https://images.unsplash.com/photo-1659081469066-c88ca2dec240?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHNvY2NlciUyMGplcnNleSUyMHNoaXJ0fGVufDF8fHx8MTc1OTQ3NDM3OHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1710301431051-ee6923af04aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjB0ZWFtJTIwdW5pZm9ybXxlbnwxfHx8fDE3NTk0NzQzNzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1759447946445-397b1c034768?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGtpdCUyMGplcnNleXxlbnwxfHx8fDE3NTk0NzQzNzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1614453966169-fd72db98e20f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBwbGF5ZXIlMjBqZXJzZXl8ZW58MXx8fHwxNzU5NDc0Mzc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1751875184658-da1fcb0b8bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHNoaXJ0JTIwY29sbGVjdGlvbnxlbnwxfHx8fDE3NTk0NzQzODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
];

function getRandomPrice(min: number, max: number): number {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateProducts(): Product[] {
  const products: Product[] = [];
  let idCounter = 1;

  // Generate products for each team
  teamsData.forEach((team) => {
    jerseyTypes.forEach((type) => {
      seasons.forEach((season) => {
        const basePrice = getRandomPrice(
          team.priceRange[0],
          team.priceRange[1]
        );
        const hasDiscount = Math.random() < 0.3; // 30% chance of discount
        const originalPrice = hasDiscount
          ? basePrice + getRandomPrice(10, 30)
          : undefined;
        const finalPrice = hasDiscount ? basePrice : basePrice;

        const isInStock = Math.random() < 0.85; // 85% chance of being in stock
        const availableSizes = getRandomElements(
          sizes,
          Math.floor(Math.random() * 4) + 3
        ); // 3-6 sizes

        const product: Product = {
          id: idCounter.toString(),
          name: `Camiseta ${team.name} ${type} ${season}`,
          team: team.name,
          league: team.league,
          country: team.country,
          jerseyType: type,
          season: season,
          price: finalPrice,
          originalPrice: originalPrice,
          image: sampleImages[Math.floor(Math.random() * sampleImages.length)],
          sizes: availableSizes.sort(
            (a, b) => sizes.indexOf(a) - sizes.indexOf(b)
          ),
          inStock: isInStock,
          personalizationOptions,
        };

        products.push(product);
        idCounter++;
      });
    });
  });

  return products.slice(0, 650); // Ensure we have exactly 650 products
}

export const allProducts = generateProducts();

// Helper functions for filtering
export const getUniqueTeams = () => {
  return Array.from(new Set(allProducts.map((p) => p.team))).sort();
};

export const getUniqueLeagues = () => {
  return Array.from(new Set(allProducts.map((p) => p.league))).sort();
};

export const getUniqueCountries = () => {
  return Array.from(new Set(allProducts.map((p) => p.country))).sort();
};

export const getUniqueJerseyTypes = () => {
  return Array.from(new Set(allProducts.map((p) => p.jerseyType))).sort();
};

export const getUniqueSeasons = () => {
  return Array.from(new Set(allProducts.map((p) => p.season))).sort();
};
