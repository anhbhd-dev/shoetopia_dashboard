import { Input, Select, Tab, TabList, Tabs } from "@chakra-ui/react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { OrderStatus } from "../../enum/order";
import { SortOption } from "../../pages/categories-page";
import { OrderFiltersType, ordersSortOptions } from "../../pages/orders-page";
export type OrdersPageHearType = {
  setSortOption: React.Dispatch<React.SetStateAction<SortOption>>;
  sortOption?: SortOption | undefined;
  setFilters: React.Dispatch<React.SetStateAction<OrderFiltersType>>;
};
export default function OrdersPageHeader({
  setSortOption,
  sortOption,
  setFilters,
}: OrdersPageHearType) {
  const handleChangeSortOption = (value: string) => {
    setSortOption(JSON.parse(value));
  };

  const handleChangeOrderId = (value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      orderCode: value,
    }));
  };
  const handleChangeOrderStatus = (value: OrderStatus) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      orderStatus: value,
    }));
  };
  return (
    <>
      <div className="flex justify-between mt-5 mb-10">
        <div className="bg-white rounded-md">
          <Select
            value={JSON.stringify(sortOption)}
            onChange={(e) => handleChangeSortOption(e.target.value)}
          >
            {ordersSortOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                selected={JSON.stringify(sortOption) === option.value}
              >
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex gap-10 align-middle">
          <div className="relative">
            <Input
              onChange={(e) => handleChangeOrderId(e.target.value)}
              placeholder="Nhập mã đơn hàng"
              size="md"
              width={400}
            />
            <HiMagnifyingGlass className="absolute top-3 right-3" />
          </div>
        </div>
      </div>
      <Tabs isFitted variant="enclosed" colorScheme="teal">
        <TabList className="font-semibold text-gray-400" mb="1em">
          <Tab onClick={() => handleChangeOrderStatus(OrderStatus.PENDING)}>
            Đang chờ
          </Tab>
          <Tab onClick={() => handleChangeOrderStatus(OrderStatus.PROCESSING)}>
            Đang xử lý
          </Tab>
          <Tab onClick={() => handleChangeOrderStatus(OrderStatus.SHIPPING)}>
            Đang giao
          </Tab>
          <Tab onClick={() => handleChangeOrderStatus(OrderStatus.DELIVERED)}>
            Đã giao
          </Tab>
          <Tab onClick={() => handleChangeOrderStatus(OrderStatus.CANCELLED)}>
            Đã huỷ
          </Tab>
        </TabList>
      </Tabs>
    </>
  );
}
