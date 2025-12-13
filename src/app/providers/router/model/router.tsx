import { roles } from "@/entities/user/model/constants";
import ChangePasswordPage from "@/pages/change-password/ui/ChangePasswordPage";
import ConnectPage from "@/pages/connect/ui/ConnectPage";
import DashboardPage from "@/pages/dashboard/ui/DashboardPage";
import LoginPage from "@/pages/login/ui/LoginPage";
import NewDashboardPage from "@/pages/new-dashboard/ui/NewDashboardPage";
import PasswordRecoveryPage from "@/pages/password-recovery/ui/PasswordRecoveryPage";
import PasswordResetPage from "@/pages/password-reset/ui/PasswordResetPage";
import ProductsPage from "@/pages/products/ui/ProductsPage";
import ProfilePage from "@/pages/profile/ui/ProfilePage";
import RegisterPage from "@/pages/register/ui/RegisterPage";
import SelectTariffPage from "@/pages/select-tariff/ui/SelectTariffPage";
import SupportPage from "@/pages/support/ui/SupportPage";
import WelcomePage from "@/pages/welcome/ui/WelcomePage";

import { ROUTE_PATHS } from "./route-paths";
import type { IRouteSchema } from "./types";

export const AUTH_ROUTES: IRouteSchema[] = [
   {
      path: ROUTE_PATHS.login,
      element: <LoginPage />,
      availableForRoles: [roles.guest, roles.user],
   },
   {
      path: ROUTE_PATHS.register,
      element: <RegisterPage />,
      availableForRoles: [roles.guest, roles.user],
   },
   {
      path: ROUTE_PATHS.passwordRecovery,
      element: <PasswordRecoveryPage />,
      availableForRoles: [roles.guest, roles.user],
   },
   {
      path: ROUTE_PATHS.passwordReset,
      element: <PasswordResetPage />,
      availableForRoles: [roles.guest, roles.user],
   },
   {
      path: ROUTE_PATHS.support,
      element: <SupportPage />,
      availableForRoles: [roles.guest, roles.user],
   },
];

export const PRIVATE_ROUTES: IRouteSchema[] = [
   {
      path: ROUTE_PATHS.dashboard,
      element: <DashboardPage />,
      availableForRoles: [roles.user, roles.admin],
   },
   {
      path: ROUTE_PATHS.newDashboard,
      element: <NewDashboardPage />,
      availableForRoles: [roles.user, roles.admin],
   },
   {
      path: ROUTE_PATHS.profile,
      element: <ProfilePage />,
      availableForRoles: [roles.user, roles.admin],
   },
   {
      path: ROUTE_PATHS.passwordChange,
      element: <ChangePasswordPage />,
      availableForRoles: [roles.user, roles.admin],
   },
   {
      path: ROUTE_PATHS.tariffSelect,
      element: <SelectTariffPage />,
      availableForRoles: [roles.user, roles.admin],
   },
   {
      path: ROUTE_PATHS.products,
      element: <ProductsPage />,
      availableForRoles: [roles.user, roles.admin],
   },
   {
      path: ROUTE_PATHS.connect,
      element: <ConnectPage />,
      availableForRoles: [roles.user, roles.admin],
   },
   {
      path: ROUTE_PATHS.welcome,
      element: <WelcomePage />,
      availableForRoles: [roles.user, roles.admin],
   },
];
