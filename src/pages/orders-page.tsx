import { useState } from "react";
import OrdersListingSection from "../components/order-page/orders-listing-section";
import OrdersPageHeader from "../components/order-page/orders-page-header";
import Pagination from "../components/pagination";
import { SortOption } from "./categories-page";
import { Skeleton, useToast } from "@chakra-ui/react";
import { OrderBy, SortBy } from "../enum/sort.enum";
import { OrderStatus } from "../enum/order";
import { useOrders } from "../apis/queries/useOrders";

export const ordersSortOptions = [
  {
    label: "Ngày tạo (mới nhất)",
    value: JSON.stringify({ sortBy: SortBy.CREATED_AT, orderBy: OrderBy.DESC }),
  },
  {
    label: "Ngày tạo (cũ nhất)",
    value: JSON.stringify({ sortBy: SortBy.CREATED_AT, orderBy: OrderBy.ASC }),
  },
];

export type OrderFiltersType = {
  orderCode?: string;
  orderStatus?: OrderStatus;
};

export default function OrderListingPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<SortOption>(
    JSON.parse(ordersSortOptions[0].value)
  );
  const [filters, setFilters] = useState<OrderFiltersType>({
    orderCode: "",
    orderStatus: OrderStatus.PENDING,
  });

  const toast = useToast();
  const { isPending, isError, data, error } = useOrders({
    page: currentPage,
    ...filters,
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
      <OrdersPageHeader
        setFilters={setFilters}
        setSortOption={setSortOption}
        sortOption={sortOption}
      />
      {isPending ? (
        <OrdersListingSkeleton />
      ) : (
        <>
          <OrdersListingSection orders={data?.orders} />
          <Pagination
            className="flex justify-end gap-2 mt-5"
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={data?.totalPage}
          />
        </>
      )}
    </main>
  );
}

export function OrdersListingSkeleton() {
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
