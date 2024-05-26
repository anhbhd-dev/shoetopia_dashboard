import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Image } from "antd";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import { useState } from "react";
import {
  useItemSaleReport,
  useRevenue,
} from "../../apis/queries/useItemSaleReport";
import { formatMoneyVND } from "../../utils/format-money";
import Pagination from "../pagination";
import CardStatistics from "./card-statistics";
export default function SaleItemsTable() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: itemSaleData } = useItemSaleReport(
    currentPage,
    selectedDates[0] ? selectedDates[0].toISOString() : undefined,
    selectedDates[1] ? selectedDates[1].toISOString() : undefined
  );
  const { data: revenue } = useRevenue(
    selectedDates[0] ? selectedDates[0].toISOString() : undefined,
    selectedDates[1] ? selectedDates[1].toISOString() : undefined
  );

  const handleClearFilter = () => {
    setSelectedDates([]);
  };
  console.log(selectedDates);
  return (
    <div className="mt-10">
      <div className="flex justify-start gap-5">
        <RangeDatepicker
          selectedDates={selectedDates}
          onDateChange={setSelectedDates}
        />
        <Button
          colorScheme="teal"
          onClick={handleClearFilter}
          variant="outline"
        >
          Bỏ lọc
        </Button>
      </div>
      <CardStatistics className="p-5 !w-[400px] mt-10">
        <div className="flex items-center justify-center h-16">
          <img className="object-cover h-full" src="/images/revenue-icon.png" />
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-base font-bold text-gray-500">Tổng doanh thu</p>
          <div className="font-bold">{formatMoneyVND(revenue)}</div>
        </div>
      </CardStatistics>
      <p className="my-10 text-2xl font-bold">Thống kê sản phẩm được bán ra</p>
      <div>
        <TableContainer
          className={`my-5 ${
            itemSaleData && itemSaleData?.data?.length > 0
              ? "min-h-[350px]"
              : "min-h-[100px]"
          }`}
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Tên sản phẩm</Th>
                <Th className="w-[150px]">Avatar</Th>
                <Th>Size</Th>
                <Th>Số lượng bán</Th>
                <Th>Giá bán tại thời điểm mua</Th>
                <Th>Tổng tiền bán được</Th>
              </Tr>
            </Thead>
            <Tbody>
              {itemSaleData?.data?.map((item) => (
                <Tr key={item._id}>
                  <Td className="w-[200px]">{item.productInfo.name}</Td>
                  <Td className="w-[150px]">
                    <Image
                      className="rounded-lg"
                      src={item.productInfo.avatar}
                      width={"80px"}
                    />
                  </Td>
                  <Td>{item.variationInfo.size}</Td>
                  <Td>{item.totalSaleQuantity}</Td>
                  <Td>{formatMoneyVND(item.salePriceAtBoughtTime)}</Td>
                  <Td>
                    {formatMoneyVND(
                      item.salePriceAtBoughtTime * item.totalSaleQuantity
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      <div className="flex justify-end mr-20">
        <Pagination
          className="flex gap-4"
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={itemSaleData?.totalPages || 1}
        />
      </div>
    </div>
  );
}
