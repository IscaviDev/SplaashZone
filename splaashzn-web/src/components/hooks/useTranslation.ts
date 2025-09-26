import { useState, useEffect } from "react";

export type Language = "es" | "en";

export interface Translations {
  // Header
  searchPlaceholder: string;
  home: string;
  products: string;
  about: string;
  contact: string;
  favorites: string;

  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  viewProducts: string;
  specialOffers: string;
  productsCount: string;
  teamsCount: string;
  fastShipping: string;

  // Product Catalog
  catalogTitle: string;
  catalogDescription: string;
  filters: string;
  clearFilters: string;
  league: string;
  team: string;
  sortBy: string;
  name: string;
  priceLowest: string;
  priceHighest: string;
  allLeagues: string;
  allTeams: string;
  noProducts: string;
  showAllProducts: string;

  // Product Card
  new: string;
  sizes: string;
  addToCart: string;

  // Cart
  cart: string;
  cartEmpty: string;
  cartEmptyDescription: string;
  continueShopping: string;
  subtotal: string;
  shipping: string;
  free: string;
  total: string;
  freeShippingMessage: string;
  checkoutButton: string;
  quantityUpdated: string;
  addedToCart: string;
  removedFromCart: string;
  thankYou: string;
  items: string;

  // Favorites
  favoritesTitle: string;
  favoritesEmpty: string;
  favoritesEmptyDescription: string;
  addedToFavorites: string;
  removedFromFavorites: string;

  // Footer
  companyDescription: string;
  quickLinks: string;
  customerService: string;
  newsletter: string;
  newsletterDescription: string;
  subscribe: string;
  subscribeDisclaimer: string;
  securePayment: string;
  easyReturns: string;
  allRightsReserved: string;
  termsConditions: string;
  privacyPolicy: string;
  emailPlaceholder: string;

  // Days and hours
  mondayFriday: string;
  saturday: string;

  // Common
  common: {
    cancel: string;
    size: string;
    quantity: string;
    total: string;
  };

  // Auth
  auth: {
    welcome: string;
    loginRegisterPrompt: string;
    login: string;
    register: string;
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    namePlaceholder: string;
    confirmPasswordPlaceholder: string;
    loggingIn: string;
    registering: string;
    loginError: string;
    registerError: string;
    passwordMismatch: string;
    passwordTooShort: string;
    logout: string;
    myAccount: string;
    myOrders: string;
  };

  // Product
  product: {
    customizeProduct: string;
    selectSize: string;
    chooseSize: string;
    personalization: string;
    personalizationOptions: {
      none: string;
      numberName: string;
      numberNamePatch: string;
      patchOnly: string;
    };
    playerNumber: string;
    playerName: string;
    basePrice: string;
    personalizationPrice: string;
    patch: string;
    pleaseSelectSize: string;
    pleaseEnterNameNumber: string;
    addToCart: string;
    free: string;
  };

  // About page content
  aboutPage: {
    title: string;
    description: string;
    authenticity: {
      title: string;
      description: string;
    };
    quality: {
      title: string;
      description: string;
    };
    shipping: {
      title: string;
      description: string;
    };
    support: {
      title: string;
      description: string;
    };
    stats: {
      customers: string;
      years: string;
      teams: string;
      rating: string;
    };
    story: {
      title: string;
      paragraph1: string;
      paragraph2: string;
      paragraph3: string;
    };
    timeline: {
      founded: {
        title: string;
        description: string;
      };
      expansion: {
        title: string;
        description: string;
      };
      community: {
        title: string;
        description: string;
      };
    };
  };

  // Checkout
  checkout: {
    billingInformation: string;
    paymentInformation: string;
    orderSummary: string;
    fullName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    processing: string;
    pay: string;
    paymentSuccess: string;
    orderConfirmation: string;
    paymentIntentError: string;
    cardElementError: string;
    paymentError: string;
  };
}

const translations: Record<Language, Translations> = {
  es: {
    // Header
    searchPlaceholder: "Buscar camisetas...",
    home: "Inicio",
    products: "Productos",
    about: "Nosotros",
    contact: "Contacto",
    favorites: "Favoritos",

    // Hero
    heroTitle: "Las Mejores Camisetas de Fútbol",
    heroSubtitle: "Camisetas",
    heroDescription:
      "Encuentra las camisetas oficiales de tus equipos favoritos. Calidad premium, diseños auténticos y envío rápido.",
    viewProducts: "Ver Productos",
    specialOffers: "Ofertas Especiales",
    productsCount: "Productos",
    teamsCount: "Equipos",
    fastShipping: "Envío Rápido",

    // Product Catalog
    catalogTitle: "Nuestro Catálogo",
    catalogDescription:
      "Explora nuestra amplia selección de camisetas oficiales de los mejores equipos del mundo",
    filters: "Filtros",
    clearFilters: "Limpiar filtros",
    league: "Liga",
    team: "Equipo",
    sortBy: "Ordenar por",
    name: "Nombre",
    priceLowest: "Precio: Menor a Mayor",
    priceHighest: "Precio: Mayor a Menor",
    allLeagues: "Todas las ligas",
    allTeams: "Todos los equipos",
    noProducts:
      "No se encontraron productos que coincidan con los filtros seleccionados.",
    showAllProducts: "Mostrar todos los productos",

    // Product Card
    new: "Nuevo",
    sizes: "Tallas",
    addToCart: "Añadir al Carrito",

    // Cart
    cart: "Carrito de Compras",
    cartEmpty: "Tu carrito está vacío",
    cartEmptyDescription: "Añade algunos productos para comenzar tu compra",
    continueShopping: "Continuar Comprando",
    subtotal: "Subtotal",
    shipping: "Envío",
    free: "Gratis",
    total: "Total",
    freeShippingMessage: "¡Envío gratis en pedidos superiores a €50!",
    checkoutButton: "Proceder al Pago",
    quantityUpdated: "Cantidad actualizada",
    addedToCart: "Agregado al carrito",
    removedFromCart: "Eliminado del carrito",
    thankYou: "¡Gracias por tu compra! Te redirigimos al pago...",
    items: "artículos",

    // Favorites
    favoritesTitle: "Mis Favoritos",
    favoritesEmpty: "No tienes favoritos aún",
    favoritesEmptyDescription:
      "Guarda tus camisetas favoritas haciendo clic en el corazón",
    addedToFavorites: "Agregado a favoritos",
    removedFromFavorites: "Eliminado de favoritos",

    // Footer
    companyDescription:
      "Tu tienda de confianza para las mejores camisetas de fútbol. Calidad premium, diseños auténticos y la pasión del fútbol en cada producto.",
    quickLinks: "Enlaces Rápidos",
    customerService: "Atención al Cliente",
    newsletter: "Newsletter",
    newsletterDescription:
      "Suscríbete para recibir ofertas exclusivas y novedades.",
    subscribe: "Suscribirse",
    subscribeDisclaimer:
      "Al suscribirte, aceptas recibir emails promocionales. Puedes darte de baja en cualquier momento.",
    securePayment: "Pago seguro",
    easyReturns: "Devoluciones fáciles",
    allRightsReserved: "Todos los derechos reservados.",
    termsConditions: "Términos y Condiciones",
    privacyPolicy: "Política de Privacidad",
    emailPlaceholder: "tu@email.com",
    mondayFriday: "Lunes - Viernes: 9:00 - 18:00",
    saturday: "Sábados: 10:00 - 14:00",

    // Common
    common: {
      cancel: "Cancelar",
      size: "Talla",
      quantity: "Cantidad",
      total: "Total",
    },

    // Auth
    auth: {
      welcome: "Bienvenido",
      loginRegisterPrompt: "Inicia sesión o regístrate para continuar",
      login: "Iniciar Sesión",
      register: "Registrarse",
      email: "Email",
      password: "Contraseña",
      name: "Nombre",
      confirmPassword: "Confirmar Contraseña",
      emailPlaceholder: "tu@email.com",
      passwordPlaceholder: "Tu contraseña",
      namePlaceholder: "Tu nombre completo",
      confirmPasswordPlaceholder: "Confirma tu contraseña",
      loggingIn: "Iniciando sesión...",
      registering: "Registrando...",
      loginError: "Error al iniciar sesión",
      registerError: "Error al registrarse",
      passwordMismatch: "Las contraseñas no coinciden",
      passwordTooShort: "La contraseña debe tener al menos 6 caracteres",
      logout: "Cerrar Sesión",
      myAccount: "Mi Cuenta",
      myOrders: "Mis Pedidos",
    },

    // Product
    product: {
      customizeProduct: "Personalizar Producto",
      selectSize: "Seleccionar Talla",
      chooseSize: "Elige una talla",
      personalization: "Personalización",
      personalizationOptions: {
        none: "Sin personalización",
        numberName: "Número y nombre",
        numberNamePatch: "Número, nombre y parche",
        patchOnly: "Solo parche",
      },
      playerNumber: "Número",
      playerName: "Nombre",
      basePrice: "Precio base",
      personalizationPrice: "Personalización",
      patch: "Parche",
      pleaseSelectSize: "Por favor selecciona una talla",
      pleaseEnterNameNumber: "Por favor ingresa el nombre y número del jugador",
      addToCart: "Añadir al Carrito",
      free: "Gratis",
    },

    // About page content
    aboutPage: {
      title: "Sobre Nosotros",
      description:
        "Somos la tienda de referencia para camisetas de fútbol auténticas. Con más de 15 años de experiencia, ofrecemos productos de la más alta calidad con la pasión del fútbol en cada detalle.",
      authenticity: {
        title: "Autenticidad Garantizada",
        description:
          "Todas nuestras camisetas son 100% oficiales y auténticas, directamente de los fabricantes oficiales.",
      },
      quality: {
        title: "Calidad Premium",
        description:
          "Materiales de la más alta calidad que garantizan durabilidad y comodidad en cada uso.",
      },
      shipping: {
        title: "Envío Rápido",
        description:
          "Entrega en 24-48 horas para que puedas lucir tu camiseta lo antes posible.",
      },
      support: {
        title: "Atención Personalizada",
        description:
          "Nuestro equipo está aquí para ayudarte con cualquier consulta o necesidad.",
      },
      stats: {
        customers: "Clientes Satisfechos",
        years: "Años de Experiencia",
        teams: "Equipos Disponibles",
        rating: "Valoración Media",
      },
      story: {
        title: "Nuestra Historia",
        paragraph1:
          "Fundada en 2008 por apasionados del fútbol, comenzamos como una pequeña tienda local con el sueño de ofrecer camisetas auténticas a precios justos.",
        paragraph2:
          "A lo largo de los años, hemos crecido hasta convertirnos en una de las tiendas online más confiables de España, manteniendo siempre nuestros valores de calidad y autenticidad.",
        paragraph3:
          "Hoy en día, servimos a miles de clientes en toda Europa, ofreciendo no solo camisetas, sino también la emoción y pasión que representa cada equipo.",
      },
      timeline: {
        founded: {
          title: "2008 - Fundación",
          description:
            "Iniciamos nuestra aventura con una pequeña tienda física en Barcelona.",
        },
        expansion: {
          title: "2015 - Expansión Digital",
          description:
            "Lanzamos nuestra plataforma online y expandimos a toda Europa.",
        },
        community: {
          title: "2020 - Comunidad Global",
          description:
            "Alcanzamos los 50,000 clientes satisfechos y una comunidad global.",
        },
      },
    },

    // Checkout
    checkout: {
      billingInformation: "Información de Facturación",
      paymentInformation: "Información de Pago",
      orderSummary: "Resumen del Pedido",
      fullName: "Nombre Completo",
      email: "Email",
      address: "Dirección",
      city: "Ciudad",
      postalCode: "Código Postal",
      processing: "Procesando...",
      pay: "Pagar",
      paymentSuccess: "¡Pago Exitoso!",
      orderConfirmation:
        "Tu pedido ha sido confirmado. Recibirás un email de confirmación pronto.",
      paymentIntentError: "Error al crear la intención de pago",
      cardElementError: "Error en el elemento de tarjeta",
      paymentError: "Error en el pago",
    },
  },
  en: {
    // Header
    searchPlaceholder: "Search jerseys...",
    home: "Home",
    products: "Products",
    about: "About",
    contact: "Contact",
    favorites: "Favorites",

    // Hero
    heroTitle: "The Best Football Jerseys",
    heroSubtitle: "Jerseys",
    heroDescription:
      "Find official jerseys from your favorite teams. Premium quality, authentic designs and fast shipping.",
    viewProducts: "View Products",
    specialOffers: "Special Offers",
    productsCount: "Products",
    teamsCount: "Teams",
    fastShipping: "Fast Shipping",

    // Product Catalog
    catalogTitle: "Our Catalog",
    catalogDescription:
      "Explore our wide selection of official jerseys from the world's best teams",
    filters: "Filters",
    clearFilters: "Clear filters",
    league: "League",
    team: "Team",
    sortBy: "Sort by",
    name: "Name",
    priceLowest: "Price: Low to High",
    priceHighest: "Price: High to Low",
    allLeagues: "All leagues",
    allTeams: "All teams",
    noProducts: "No products found matching the selected filters.",
    showAllProducts: "Show all products",

    // Product Card
    new: "New",
    sizes: "Sizes",
    addToCart: "Add to Cart",

    // Cart
    cart: "Shopping Cart",
    cartEmpty: "Your cart is empty",
    cartEmptyDescription: "Add some products to start shopping",
    continueShopping: "Continue Shopping",
    subtotal: "Subtotal",
    shipping: "Shipping",
    free: "Free",
    total: "Total",
    freeShippingMessage: "Free shipping on orders over €50!",
    checkoutButton: "Proceed to Checkout",
    quantityUpdated: "Quantity updated",
    addedToCart: "Added to cart",
    removedFromCart: "Removed from cart",
    thankYou: "Thank you for your purchase! Redirecting to payment...",
    items: "items",

    // Favorites
    favoritesTitle: "My Favorites",
    favoritesEmpty: "You have no favorites yet",
    favoritesEmptyDescription:
      "Save your favorite jerseys by clicking the heart icon",
    addedToFavorites: "Added to favorites",
    removedFromFavorites: "Removed from favorites",

    // Footer
    companyDescription:
      "Your trusted store for the best football jerseys. Premium quality, authentic designs and football passion in every product.",
    quickLinks: "Quick Links",
    customerService: "Customer Service",
    newsletter: "Newsletter",
    newsletterDescription: "Subscribe to receive exclusive offers and news.",
    subscribe: "Subscribe",
    subscribeDisclaimer:
      "By subscribing, you agree to receive promotional emails. You can unsubscribe at any time.",
    securePayment: "Secure payment",
    easyReturns: "Easy returns",
    allRightsReserved: "All rights reserved.",
    termsConditions: "Terms & Conditions",
    privacyPolicy: "Privacy Policy",
    emailPlaceholder: "your@email.com",
    mondayFriday: "Monday - Friday: 9:00 AM - 6:00 PM",
    saturday: "Saturday: 10:00 AM - 2:00 PM",

    // Common
    common: {
      cancel: "Cancel",
      size: "Size",
      quantity: "Quantity",
      total: "Total",
    },

    // Auth
    auth: {
      welcome: "Welcome",
      loginRegisterPrompt: "Sign in or register to continue",
      login: "Sign In",
      register: "Register",
      email: "Email",
      password: "Password",
      name: "Name",
      confirmPassword: "Confirm Password",
      emailPlaceholder: "your@email.com",
      passwordPlaceholder: "Your password",
      namePlaceholder: "Your full name",
      confirmPasswordPlaceholder: "Confirm your password",
      loggingIn: "Signing in...",
      registering: "Registering...",
      loginError: "Login error",
      registerError: "Registration error",
      passwordMismatch: "Passwords do not match",
      passwordTooShort: "Password must be at least 6 characters",
      logout: "Sign Out",
      myAccount: "My Account",
      myOrders: "My Orders",
    },

    // Product
    product: {
      customizeProduct: "Customize Product",
      selectSize: "Select Size",
      chooseSize: "Choose a size",
      personalization: "Personalization",
      personalizationOptions: {
        none: "No personalization",
        numberName: "Number and name",
        numberNamePatch: "Number, name and patch",
        patchOnly: "Patch only",
      },
      playerNumber: "Number",
      playerName: "Name",
      basePrice: "Base price",
      personalizationPrice: "Personalization",
      patch: "Patch",
      pleaseSelectSize: "Please select a size",
      pleaseEnterNameNumber: "Please enter player name and number",
      addToCart: "Add to Cart",
      free: "Free",
    },

    // About page content
    aboutPage: {
      title: "About Us",
      description:
        "We are the reference store for authentic football jerseys. With over 15 years of experience, we offer the highest quality products with football passion in every detail.",
      authenticity: {
        title: "Guaranteed Authenticity",
        description:
          "All our jerseys are 100% official and authentic, directly from official manufacturers.",
      },
      quality: {
        title: "Premium Quality",
        description:
          "Highest quality materials that guarantee durability and comfort in every use.",
      },
      shipping: {
        title: "Fast Shipping",
        description:
          "24-48 hour delivery so you can wear your jersey as soon as possible.",
      },
      support: {
        title: "Personalized Support",
        description:
          "Our team is here to help you with any questions or needs.",
      },
      stats: {
        customers: "Satisfied Customers",
        years: "Years of Experience",
        teams: "Available Teams",
        rating: "Average Rating",
      },
      story: {
        title: "Our Story",
        paragraph1:
          "Founded in 2008 by football enthusiasts, we started as a small local store with the dream of offering authentic jerseys at fair prices.",
        paragraph2:
          "Over the years, we have grown to become one of Spain's most trusted online stores, always maintaining our values of quality and authenticity.",
        paragraph3:
          "Today, we serve thousands of customers across Europe, offering not just jerseys, but also the excitement and passion that each team represents.",
      },
      timeline: {
        founded: {
          title: "2008 - Founded",
          description:
            "We started our adventure with a small physical store in Barcelona.",
        },
        expansion: {
          title: "2015 - Digital Expansion",
          description:
            "We launched our online platform and expanded across Europe.",
        },
        community: {
          title: "2020 - Global Community",
          description:
            "We reached 50,000 satisfied customers and a global community.",
        },
      },
    },

    // Checkout
    checkout: {
      billingInformation: "Billing Information",
      paymentInformation: "Payment Information",
      orderSummary: "Order Summary",
      fullName: "Full Name",
      email: "Email",
      address: "Address",
      city: "City",
      postalCode: "Postal Code",
      processing: "Processing...",
      pay: "Pay",
      paymentSuccess: "Payment Successful!",
      orderConfirmation:
        "Your order has been confirmed. You will receive a confirmation email shortly.",
      paymentIntentError: "Error creating payment intent",
      cardElementError: "Error in card element",
      paymentError: "Payment error",
    },
  },
};

export function useTranslation() {
  const [language, setLanguage] = useState<Language>("es");

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      "futbolshirt-language"
    ) as Language;
    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en")) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("futbolshirt-language", language);
  }, [language]);

  const t = translations[language];

  const switchLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "es" ? "en" : "es"));
  };

  return {
    language,
    t,
    switchLanguage,
    toggleLanguage,
  };
}
