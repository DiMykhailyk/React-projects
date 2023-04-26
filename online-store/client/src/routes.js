import Admin from "./pages/Admin";
import {ADMIN_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "./utils/contsts";
import Auth from "./pages/Auth";
import Shop from "./pages/Shop";
import DevicePage from "./pages/DevicePage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin,
    },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop,
    },

    {
        path: LOGIN_ROUTE,
        Component: Auth,
    },

    {
        path: REGISTRATION_ROUTE,
        Component: Auth,
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage,
    },
]