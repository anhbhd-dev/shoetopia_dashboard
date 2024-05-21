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
import { useItemSaleReport } from "../../apis/queries/useItemSaleReport";
import { Image } from "antd";
import { formatMoneyVND } from "../../utils/format-money";
import { useState } from "react";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
export default function SaleItemsTable() {
  const { isPending, isError, data: itemSaleData, error } = useItemSaleReport();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
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
    </div>
  );
}
