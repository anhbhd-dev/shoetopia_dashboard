import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useCategories } from "../apis/queries/useCategories";
import CategoriesListing, {
  CategoryListingSkeleton,
} from "../components/categories-page/categories-table";
import CategoryPageHeader from "../components/categories-page/category-page-header";
import Pagination from "../components/pagination";
import { OrderBy, SortBy } from "../enum/sort.enum";

export type SortOption = {
  sortBy?: SortBy;
  orderBy?: OrderBy;
};

export default function CategoriesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<SortOption>();
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const toast = useToast();
  const { isPending, isError, data, error } = useCategories({
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
      <CategoryPageHeader
        setCurrentPage={setCurrentPage}
        setSearchKeyword={setSearchKeyword}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

      {isPending ? (
        <CategoryListingSkeleton />
      ) : (
        <>
          <CategoriesListing categories={data.categories} />

          {data?.categories?.length > 0 && (
            <div className="flex justify-end">
              <Pagination
                className="flex gap-2 mt-10"
                currentPage={currentPage}
                totalPage={data.totalPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </main>
  );
}
