import HeaderProductsListingPage from "../components/products-page/header-products-page";
import ProductListingTable from "../components/products-page/products-listing-table";

export default function ProductsListingPage() {
  return (
    <main className="mr-5">
      <HeaderProductsListingPage />
      <ProductListingTable />
    </main>
  );
}
