import { useEffect, useState } from "react";
import CardStatistics from "../components/statistics/card-statistics";
import { getCountUser } from "../apis/user.services";
import { countOrders, countRevenue } from "../apis/order-services";
import { formatMoneyVND } from "../utils/format-money";
import { Skeleton, useToast } from "@chakra-ui/react";
import { countProducts } from "../apis/product-services";
import SaleItemsTable from "../components/statistics/sale-item-table";

export default function Statistics() {
  const [usersCount, setUsersCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [ordersToday, setOrdersToday] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const toast = useToast();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let timer: any;
    const getDashboard = async () => {
      setIsLoading(true);
      const usersCountRes = await getCountUser();
      const totalRevenue = await countRevenue();
      const ordersToday = await countOrders();
      const totalProductsRes = await countProducts();

      await Promise.all([
        usersCountRes,
        totalRevenue,
        ordersToday,
        totalProductsRes,
      ])
        .then(([userCountRes, totalRevenueRes]) => {
          setUsersCount(userCountRes);
          setTotalRevenue(totalRevenueRes);
          setOrdersToday(ordersToday);
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
            <div className="font-bold">{ordersToday}</div>
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
        <CardStatistics className="p-5">
          <div className="flex items-center justify-center h-16">
            <img
              className="object-cover h-full"
              src="/images/revenue-icon.png"
            />
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-base font-bold text-gray-500">Tổng doanh thu</p>
            <div className="font-bold">{formatMoneyVND(totalRevenue)}</div>
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
      {/* <div className="flex justify-end gap-2 mt-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton className="w-10 h-10 mb-5" key={i}>
            <div>contents wrapped</div>
          </Skeleton>
        ))}
      </div> */}
    </>
  );
}
