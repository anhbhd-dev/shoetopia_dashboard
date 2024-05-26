import { Skeleton, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { countProducts } from "../apis/product-services";
import { getCountUser } from "../apis/user.services";
import CardStatistics from "../components/statistics/card-statistics";
import SaleItemsTable from "../components/statistics/sale-item-table";
import { useCountOrderToday } from "../apis/queries/useItemSaleReport";

export default function Statistics() {
  const [usersCount, setUsersCount] = useState(0);
  const { data: orderToday } = useCountOrderToday();
  const [isLoading, setIsLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const toast = useToast();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let timer: any;
    const getDashboard = async () => {
      setIsLoading(true);
      const usersCountRes = await getCountUser();

      const totalProductsRes = await countProducts();

      await Promise.all([usersCountRes, totalProductsRes])
        .then(([userCountRes, totalProductsRes]) => {
          setUsersCount(userCountRes);

          setTotalProducts(totalProductsRes);
          timer = setTimeout(() => {
            setIsLoading(false);
          }, 200);
        })
        .catch(() => {
          toast({
            title: "Đã xảy ra lỗi",
            status: "error",
            duration: 1500,
            isClosable: true,
          });
        });
    };
    getDashboard();
    return () => clearTimeout(timer);
  }, [toast]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        <CardStatistics className="p-5">
          <div className="flex items-center justify-center h-16">
            <img className="object-cover h-full" src="/images/order-icon.png" />
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-base font-bold text-gray-500">
              Đơn hàng hôm nay
            </p>
            <div className="font-bold">{orderToday}</div>
          </div>
        </CardStatistics>
        <CardStatistics className="p-5">
          <div className="flex items-center justify-center h-16">
            <img
              className="object-cover h-full"
              src="/images/product-icon.png"
            />
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-base font-bold text-gray-500">
              Tổng số mặt hàng hiện có
            </p>
            <div className="font-bold">{totalProducts}</div>
          </div>
        </CardStatistics>
        <CardStatistics className="p-5">
          <div className="flex items-center justify-center h-16">
            <img className="object-cover h-full" src="/images/user-icon.png" />
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-base font-bold text-gray-500">
              Số lượng người dùng
            </p>
            <div className="font-bold">{usersCount}</div>
          </div>
        </CardStatistics>
      </div>
      <SaleItemsTable />
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton className="h-24 mb-5" key={i}>
            <div>contents wrapped</div>
          </Skeleton>
        ))}
      </div>
    </>
  );
}
