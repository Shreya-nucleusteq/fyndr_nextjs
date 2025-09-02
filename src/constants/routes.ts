import { slugify } from "@/lib/utils/url";
import { RouteAccess } from "@/types/auth/auth.types";

const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  SIGN_UP_COMPLETE: "/sign-up/complete",
  RESET_PASSWORD: "/reset-password",
  WALLET: "/wallet",
  ABOUT_US: "/about-us",
  MY_OFFERS: "/my-offers",
  OFFERS_AND_EVENTS: "/offers-and-events",
  OFFER_LISTING: "/offer-listing",
  PROFILE: `/profile`,
  OFFER_DETAILS: (bizName: string, qrCode: string) =>
    slugify(`/offer-details/${bizName}/${qrCode}`),
  OFFER_LISTING_CATEGORY: (category: string) => `/offer-listing/${category}`,
  STORE: (storeUrl: number | string, locId?: number | string) =>
    !locId ? `/store/${storeUrl}` : `/store/${storeUrl}?location=${locId}`,
  STORE_CART: `/store/cart`,
  STORE_ITEMS: ({
    bizId,
    categoryId,
    locId,
    storeId,
    storeUrl,
  }: {
    bizId: number;
    storeId: number;
    categoryId: number;
    locId?: number;
    storeUrl: string;
  }) =>
    locId
      ? `/store/${storeUrl}/${bizId}/${storeId}/${categoryId}?location=${locId}`
      : `/store/${storeUrl}/${bizId}/${storeId}/${categoryId}`,

  // Legal routes
  LEGAL_TERMS: "/legal/terms",
  LEGAL_PRIVACY: "/legal/privacy",
  LEGAL_AGREEMENT: "/legal/agreement",
  DOWNLOAD_FYNDR: "/download-fyndr-app",
  // BUSINESS_AGREEMENT: "/legal/agreement",

  // User routes
  USER_DASHBOARD: "/user/billing/transaction",

  // Business routes
  BUSINESS_DASHBOARD: "/business/billing/transaction",
  BUSINESS_CAMPAIGNS: "/business/campaign",
  BUSINESS_CAMPAIGN_CREATE: "/business/campaign/create",
  BUSINESS_CAMPAIGN_EDIT: (id: number | string) =>
    `/business/campaign/edit/${id}`,
  BUSINESS_STRIPE_CONNECT: "/business/payment/stripe-connect",
  BUSINESS_PAYMENT_METHODS: "/business/payment/methods",
  BUSINESS_STORE: "/business/store",
  BUSINESS_STORE_CREATE: "/business/store/create",
  BUSINESS_STORE_EDIT: (id: number | string) => `/business/store/edit/${id}`,
  BUSINESS_STORE_CATEGORY: "/business/catalogue/categories",
  BUSINESS_STORE_CATEGORY_CREATE: "/business/catalogue/categories/add",
  BUSINESS_STORE_CATEGORY_EDIT: (id: number | string) =>
    `/business/store/category/edit/${id}`,
  BUSINESS_STORE_ITEM: "/business/catalogue/items",
  BUSINESS_STORE_ITEM_CREATE: "/business/catalogue/items/add",
  BUSINESS_STORE_ITEM_EDIT: (id: number | string) =>
    `/business/store/item/edit/${id}`,
  BUSINESS_STORE_MODIFIER: "/business/catalogue/modifiers",
  BUSINESS_STORE_MODIFIER_CREATE: "/business/catalogue/modifiers/add",
  BUSINESS_STORE_MODIFIER_EDIT: (id: number | string) =>
    `/business/store/modifier/edit/${id}`,
  BUSINESS_ACCOUNT_LOGO: "/business/account/logo",
  BUSINESS_ACCOUNT_QR: "/business/account/qr",
  BUSINESS_ACCOUNT_LOCATION: "/business/account/location",
  BUSINESS_ACCOUNT_LOCATION_CREATE: "/business/account/location/create",
  BUSINESS_ACCOUNT_LOCATION_EDIT: (id: string | number) =>
    `/business/account/location/${id}`,
  BUSINESS_ACCOUNT_OFFER_SUMMARY: "/business/account/offer-summary",
  BUSINESS_ACCOUNT_APPOINTMENT: "/business/account/appointment",
  BUSINESS_ACCOUNT_CUSTOM_EMAIL: "/business/account/custom-email",
  BUSINESS_ACCOUNT_CREATE_INVOICE: "/business/invoice",
  BUSINESS_DISPUTE: "/business/dispute",

  // Admin routes
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_USER_DETAILS: "/admin/user-details",
  ADMIN_MANAGEMENT: "/admin/management",
  ADMIN_REGISTRATION_RECORDS: "/admin/registration-records",
  ADMIN_PROMOCODES: "/admin/promos",
  ADMIN_CAMPAIGNS: "/admin/campaigns",
  ADMIN_REVENUE: "/admin/revenue",
  ADMIN_DISPUTE: "/admin/dispute",
  ADMIN_PLATFORM_VARIABLES: "/admin/platform-variable",
  ADMIN_COMMENTS_REPORTS: "/admin/comments-and-reports",

  // Support routes
  SUPPORT_DASHBOARD: "/support/dashboard",

  // CAllback routes
  CALLBACK_SIGN_IN: "/callback/sign-in",
  CALLBACK_AUTH: "/callback/auth",
};

export const PUBLIC_ROUTES = [
  // Listing & non listing routes
  ROUTES.HOME,
  ROUTES.ABOUT_US,
  ROUTES.OFFERS_AND_EVENTS,
  ROUTES.OFFER_LISTING,
  ROUTES.OFFER_LISTING,
  ROUTES.DOWNLOAD_FYNDR,

  // Auth routes
  ROUTES.SIGN_IN,
  ROUTES.SIGN_UP,
  ROUTES.SIGN_UP_COMPLETE,

  // Legal routes
  ROUTES.LEGAL_AGREEMENT,
  ROUTES.LEGAL_TERMS,
  ROUTES.LEGAL_PRIVACY,
];

export const ROLE_BASED_ROUTES: RouteAccess[] = [
  { path: "/business", roles: ["BIZ_ADMIN"] },
  { path: "/admin", roles: ["SUPER_ADMIN"] },
  // { path: ROUTES.SUPPORT_DASHBOARD, roles: ["FYNDR_SUPPORT", "SUPER_ADMIN"] },
];

export default ROUTES;
