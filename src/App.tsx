import { Navigate, Route, Routes } from "react-router-dom";
import SidebarWithHeader from "./layouts/layout";
import CategoriesPage from "./pages/categories-page";
import UserProfileEdit from "./pages/edit-profile-page";
import LoginForm from "./pages/login-page";
import OrderDetailPage from "./pages/order-detail-page";
import OrderListingPage from "./pages/orders-page";
import PaymentMethodsPage from "./pages/payment-methods-page";
import ProductDetailPage from "./pages/product-detail-page";
import ProductsListingPage from "./pages/products-page";
import ProtectedRoute from "./layouts/protected-route";
import Statistics from "./pages/statistics-page";
import NotFoundPage from "./not-found";

export default function App() {
  return (
    <Routes>
      <Route path="/admin/auth/login" element={<LoginForm />} />
      <Route path="/admin/*" element={<ProtectedRoute />}>
        <Route element={<SidebarWithHeader />}>
          <Route index element={<Navigate to="statistic" />} />
          <Route path="statistic" element={<Statistics />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="orders" element={<OrderListingPage />} />
          <Route path="orders/:id" element={<OrderDetailPage />} />
          <Route path="products" element={<ProductsListingPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="payment-methods" element={<PaymentMethodsPage />} />
          <Route path="profile" element={<UserProfileEdit />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
