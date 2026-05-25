export const ROUTES = {
    HOME: "/",
    LONGIN: "/login",
    LEARN: (slug: string) => `/learn/${slug}`,
    LEARN_QUIZ: (slug: string) => `/learn/${slug}/quiz`,
    DASHBOARD: "/dashboard",
    DASHBOARD_NEW: "/dashboard/new",
    DASHBOARD_EDIT: (slug: string) => `/dashboard/edit/${slug}`,
    HISTORY: "/history",
    FAVORITES: "/favorites",
} as const;

export const JSON_PLACEHOLDER = `[
  {
    "word": "apple",
    "meaning": "táo",
    "reading": "りんご"
  },
  {
    "word": "book",
    "meaning": "sách",
    "reading": "ほん"
  }
]`;
