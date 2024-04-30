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
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PaymentMethod } from "../../enum/order";
import { Order } from "../../types/order.type";
import { formatDate } from "../../utils/format-date";
import { Image } from "antd";
export type OrdersListingProps = {
  orders: Order[];
};

export default function OrdersListingSection({ orders }: OrdersListingProps) {
  return (
    <>
      <TableContainer
        className={`my-10 ${
          orders?.length > 0 ? "min-h-[350px]" : "min-h-[100px]"
        }`}
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Mã đơn hàng</Th>
              <Th className="w-[150px]"></Th>
              <Th>Phương thức thanh toán</Th>
              <Th>Ngày tạo</Th>
              <Th>Số điện thoại người nhận</Th>
              <Th>Chi tiết</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders?.map((order) => (
              <Tr key={order._id}>
                <Td className="w-[200px]">{order.orderCode}</Td>
                <Td className="w-[150px]">
                  <Image
                    className="rounded-lg"
                    src={order.orderItems[0].product.avatar}
                    width={"80px"}
                  />
                </Td>
                <Td>
                  {order.payment.paymentMethod ===
                  PaymentMethod.CASH_ON_DELIVERY
                    ? "COD"
                    : "Online banking"}
                </Td>
                <Td>{formatDate(order.createdAt)}</Td>
                <Td>{order.phoneNumber}</Td>
                <Td width={"150px"}>
                  <div className="flex gap-5">
                    <Link to={`${order._id}`}>
                      <Button variant={"outline"} colorScheme="blue">
                        <FaEye />
                      </Button>
                    </Link>
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {orders?.length === 0 && (
        <p className="mt-20 text-center">Không tìm thấy kết quả tương ứng</p>
      )}
    </>
  );
}
