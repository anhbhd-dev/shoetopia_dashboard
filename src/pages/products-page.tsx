import { Skeleton, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useProducts } from "../apis/queries/useProducts";
import Pagination from "../components/pagination";
import HeaderProductsListingPage, {
  productSortOptions,
} from "../components/products-page/header-products-page";
import ProductListingTable from "../components/products-page/products-listing-table";
import { SortOption } from "./categories-page";

export default function ProductsListingPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<SortOption>(
    JSON.parse(productSortOptions[2].value)
  );
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const toast = useToast();
  const { isPending, isError, data, error } = useProducts({
    page: currentPage,
    name: searchKeyword,
    ...sortOption,
  });

  if (isError) {
    toast({
      title: "Có lỗi xảy ra",
      description: error.message,
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  }
  return (
    <main className="mr-5">
      <HeaderProductsListingPage
        sortOption={sortOption}
        setSortOption={setSortOption}
        setSearchKeyword={setSearchKeyword}
      />
      {!isPending ? (
        <>
          <ProductListingTable products={data?.products} />
          <Pagination
            className="flex justify-end gap-2 mt-5"
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={data?.totalPage}
          />
        </>
      ) : (
        <ProductsListingSkeleton />
      )}
    </main>
  );
}

export function ProductsListingSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton className="mb-5 h-14" key={i}>
          <div>contents wrapped</div>
        </Skeleton>
      ))}
      <div className="flex justify-end gap-2 mt-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton className="w-10 h-10 mb-5" key={i}>
            <div>contents wrapped</div>
          </Skeleton>
        ))}
      </div>
    </>
  );
}
