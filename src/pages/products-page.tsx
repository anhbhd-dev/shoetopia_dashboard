import { SetStateAction, useState } from "react";
import HeaderProductsListingPage, {
  productSortOptions,
} from "../components/products-page/header-products-page";
import ProductListingTable from "../components/products-page/products-listing-table";
import { useToast } from "@chakra-ui/react";
import { SortOption } from "./categories-page";
import Pagination from "../components/pagination";

export default function ProductsListingPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<SortOption | undefined>(
    JSON.parse(productSortOptions[2].value)
  );

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const toast = useToast();
  return (
    <main className="mr-5">
      <HeaderProductsListingPage
        sortOption={sortOption}
        setSortOption={setSortOption}
        setSearchKeyword={setSearchKeyword}
      />
      <ProductListingTable />
      <Pagination
        className="flex justify-end gap-2 mt-5"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={5}
      />
    </main>
  );
}
