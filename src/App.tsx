import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SidebarWithHeader from "./layouts/layout";
import OrderListingPage from "./pages/orders-page";
import CategoriesPage from "./pages/categories-page";
import ProductsListingPage from "./pages/products-page";
import PaymentMethodsPage from "./pages/payment-methods-page";
import ProductDetailPage from "./pages/product-detail-page";
import OrderDetailPage from "./pages/order-detail-page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<SidebarWithHeader />}>
          <Route index element={<Navigate to="/admin/categories" />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="orders" element={<OrderListingPage />} />
          <Route path="orders/:id" element={<OrderDetailPage />} />
          <Route path="products" element={<ProductsListingPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="payment-methods" element={<PaymentMethodsPage />} />
          <Route path="profile" element={<OrderListingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
