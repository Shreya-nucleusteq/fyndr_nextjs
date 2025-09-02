import {
  Logs,
  ShoppingCart,
  BadgePlus,
  Shapes,
  Users,
  CircleDollarSign,
  Wallet,
  CreditCard,
  Store,
  ArchiveRestore,
  Blocks,
  PackagePlus,
  Building2,
  ReceiptText,
  IdCard,
  QrCode,
  Landmark,
  ChartPie,
  UserCheck,
  CircleUser,
  UserPen,
  LockKeyhole,
  MessageSquareWarning,
  BookCheck,
  Gavel,
} from "lucide-react";

import ROUTES from "../routes";

import { SubMenuProps } from ".";

export const BUSINESS_MENU: SubMenuProps[] = [
  {
    icon: Logs,
    route: "/business/billing/transaction",
    label: "My Orders",
    hasSubMenu: false,
  },
  {
    icon: ShoppingCart,
    route: "",
    label: "Campaigns",
    hasSubMenu: true,
    subMenu: [
      {
        icon: BadgePlus,
        route: "/business/campaign/add/1",
        label: "Create Campaign",
      },
      {
        icon: Shapes,
        route: "/business/campaign",
        label: "Campaigns",
      },
    ],
  },
  {
    icon: Users,
    route: "",
    label: "Interactions",
    hasSubMenu: false,
  },
  {
    icon: CircleDollarSign,
    route: "",
    label: "Payments",
    hasSubMenu: true,
    subMenu: [
      {
        icon: Wallet,
        route: "/business/merchant/stripe_connect",
        label: "Collect Payment",
      },
      {
        icon: CreditCard,
        route: "",
        label: "Payment Methods",
      },
    ],
  },
  {
    icon: Store,
    route: "",
    label: "Stores",
    hasSubMenu: true,
    subMenu: [
      {
        icon: ArchiveRestore,
        route: "/business/catalogue/list",
        label: "Create Store",
      },
      {
        icon: Shapes,
        route: "/business/catalogue/categories",
        label: "Categories",
      },
      {
        icon: Blocks,
        route: "/business/catalogue/items",
        label: "Items",
      },
      {
        icon: PackagePlus,
        route: "/business/catalogue/modifiers",
        label: "Modifiers",
      },
    ],
  },
  {
    icon: Building2,
    route: "",
    label: "Business",
    hasSubMenu: true,
    subMenu: [
      {
        icon: ReceiptText,
        route: "",
        label: "Business Terms",
      },
      {
        icon: IdCard,
        route: ROUTES.BUSINESS_ACCOUNT_LOGO,
        label: "Business Logo",
      },
      {
        icon: QrCode,
        route: ROUTES.BUSINESS_ACCOUNT_QR,
        label: "QR Logo",
      },
      {
        icon: Landmark,
        route: ROUTES.BUSINESS_ACCOUNT_LOCATION,
        label: "Locations",
      },
      {
        icon: ChartPie,
        route: ROUTES.BUSINESS_ACCOUNT_OFFER_SUMMARY,
        label: "Offer Summary",
      },
      {
        icon: UserCheck,
        route: "",
        label: "My Appointments",
      },
    ],
  },
  {
    icon: CircleUser,
    route: "",
    label: "Profile",
    hasSubMenu: true,
    subMenu: [
      {
        icon: UserPen,
        route: "",
        label: "Update Profile",
      },
      {
        icon: LockKeyhole,
        route: "",
        label: "Change Password",
      },
    ],
  },
  {
    icon: MessageSquareWarning,
    route: "",
    label: "Reports",
    hasSubMenu: true,
    subMenu: [
      {
        icon: BookCheck,
        route: "",
        label: "Terms Accepted",
      },
    ],
  },
  {
    icon: Gavel,
    route: "",
    label: "Dispute",
    hasSubMenu: false,
  },
];
