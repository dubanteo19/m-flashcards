export const ROUTES = {
    HOME: "/",
    LONGIN: "/login",
    LEARN: (slug: string) => `/learn/${slug}`,
    DASHBOARD: "/dashboard",
    DASHBOARD_NEW: "/dashboard/new",
    DASHBOARD_EDIT: (slug: string) => `/dashboard/edit/${slug}`,
    HISTORY: "/history",
    FAVORITES: "/favorites",
} as const;