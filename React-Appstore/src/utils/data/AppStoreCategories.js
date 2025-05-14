import { 
    ChevronRight, 
    ChevronDown, 
    Smartphone, 
    Gamepad2,
    BookOpen,
    Film,
    Music,
    Newspaper, 
    ShoppingBag,
    Users,
    Briefcase,
    Heart,
    Zap,
    Settings,
    History,
    BellRing
  } from "lucide-react";
  
  // App Store categories with icons

export const appStoreCategories = [
    {
      title: "Miscellenous",
      icon: Smartphone,
      route: "/category/miscellenous",
      submenu: true,
      subMenuItems: [
        { title: "Supported Languages", icon: Heart, route: "/category/miscellenous/supported-languages" },
        { title: "Supported Countries", icon: Zap, route: "/category/miscellenous/supported-countries" },
        { title: "Supported SDKS", icon: BellRing, route: "/category/miscellenous/supported-sdks" },
        { title: "Supported IAB Categories", icon: BellRing, route: "/category/miscellenous/supported-iab-categories" },
        { title: "Supported Review Topics", icon: BellRing, route: "/category/miscellenous/supported-review-topics" },
      ],
    },
    {
      title: "Apps",
      icon: Smartphone,
      route: "/category/apps",
      submenu: true,
      subMenuItems: [
        { title: "For You", icon: Heart, route: "/category/apps/for-you" },
        { title: "Top Charts", icon: Zap, route: "/category/apps/top-charts" },
        { title: "New Releases", icon: BellRing, route: "/category/apps/new-releases" },
      ],
    },
    {
      title: "Games",
      icon: Gamepad2,
      route: "/category/games",
      submenu: true,
      subMenuItems: [
        { title: "For You", icon: Heart, route: "/category/games/for-you" },
        { title: "Top Charts", icon: Zap, route: "/category/games/top-charts" },
        { title: "New Releases", icon: BellRing, route: "/category/games/new-releases" },
        { title: "Premium", icon: ShoppingBag, route: "/category/games/premium" },
      ],
    },
    {
      title: "Education",
      icon: BookOpen,
      route: "/category/education",
      spacing: true,
    },
    {
      title: "Entertainment",
      icon: Film,
      route: "/category/entertainment",
    },
    {
      title: "Music & Audio",
      icon: Music,
      route: "/category/music-audio",
    },
    {
      title: "News",
      icon: Newspaper,
      route: "/category/news",
    },
    {
      title: "Shopping",
      icon: ShoppingBag,
      route: "/category/shopping",
    },
    {
      title: "Social",
      icon: Users,
      route: "/category/social",
      spacing: true,
    },
    {
      title: "Business",
      icon: Briefcase,
      route: "/category/business",
    },
    {
      title: "My Apps",
      icon: Smartphone,
      route: "/category/my-apps",
      submenu: true,
      subMenuItems: [
        { title: "Installed", icon: Smartphone, route: "/category/my-apps/installed" },
        { title: "Library", icon: BookOpen, route: "/category/my-apps/library" },
        { title: "Updates", icon: History, route: "/category/my-apps/updates" },
      ],
    },
    {
      title: "Settings",
      icon: Settings,
      route: "/category/settings",
    },
  ];
