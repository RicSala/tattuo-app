export const config = {
  general: {
    appName: "Tattuo",
  },

  colors: {
    backgroundLight: "0deg 55% 95%",
    backgroundDark: "0deg 85% 15%",
    primaryLight: "red",
    primaryDark: "red",
    lightThemeBackGround: "red",
    secondaryLight: "purple",
    secondaryDark: "purple",
    accentLight: "orange",
    accentDark: "orange",
    destructiveLight: "red",
    destructiveDark: "red",
    mutedDark: "grey",
    infoLight: "yellow",
    infoDark: "yellow",
  },

  blog: {
    // If you are not going to use the blog, just turn it off by wrapping the directory with parenthesys (blog)
    // That will make the directory "not a route"
    title: "Las mejores herramientas para buscar trabajo",
    subtitle:
      "Utiliza la tecnología para encontrarlo antes y destacar sobre otros candidatos",
  },

  // ### CUSTOMER SUPPORT
  support: {
    cripsId: "c597d7de-19fe-48d5-9651-928bc23f3fb8",

    routesWithSupport: ["/"],
  },

  // ### FILE UPLOADS
  uploads: {},

  // ### EMAIL
  email: {
    subdomain: "",

    fromNoReply: "Tattuo <noreply@ricardosala.com>",

    fromAdmin: "Ricardo at Tattuo <ricardo@mg.tattuo.com>",

    supportEmail: "ricardo@mg.tattuo.com",

    forwardRepliesTo: "ricardo@grouz.io",
    testSubdomain: "sandboxb2328a93eff54cb99ceee2827f1dcd16.mailgun.org",
  },

  // ### AUTH
  auth: {
    redirectAfterLoginUrl: "/dashboard",
    authMethods: {
      credentials: false,
      google: true,
      email: true,
    },
  },

  // ### STRINGS
  strings: {
    metas: {
      title: "Tattuo App",
      description: "Ship faster with Tattuo",
    },
    toasts: {
      welcomeToastDescription: "Continua navegando",
      welcomeToastTitle: `Bienvenido a Tattuo`,
      linkSentToastDescription:
        "Te hemos enviado un link para acceder desde tu correo",
      linkSentToastTitle: `Link Enviado · REVISA TU CORREO 📧`,
    },
  },

  // ### PRODUCTS

  productIds: [
    "prod_MgZBvTWR1T7Ape",
    "prod_Od6Bm9K5Kt1p7E",
    "prod_OgYwaGXuY8itev",
  ],

  // ### PLANS
  plans: [
    {
      featured: false,
      name: "Basic",
      description: "Basic Plan yo!",
      price: "$10/month",
      stripePriceId: "price_1NpoWVInQyVRXAJyBgaid9PD",
      features: [
        { name: "this is a test" },
        { name: "this is a test" },
        { name: "this is a test" },
      ],
    },
    {
      name: "Pro",
      description: "Pro Plan yo!",
      price: "$49/month",
      stripePriceId: "price_456",
      features: [
        { name: "this is a test" },
        { name: "this is a test" },
        { name: "this is a test" },
      ],
    },
  ],
};
