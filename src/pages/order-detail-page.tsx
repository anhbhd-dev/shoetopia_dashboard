import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Image } from "antd";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSingleOrder } from "../apis/queries/useSingleOrder";
import { OrderStatus, PaymentMethod, PaymentStatus } from "../enum/order";
import { formatMoneyVND } from "../utils/format-money";
import { useUpdateOrderStatus } from "../apis/queries/useUpdateOrderStatus";
import { PDFDownloadLink } from "@react-pdf/renderer";
import OrderPDF from "../components/order-page/order-pdf";
export default function OrderDetailPage() {
  const { id } = useParams();
  const {
    data: order,
    isPending,
    isError,
    error,
  } = useSingleOrder(id as string);

  const toast = useToast();
  if (isError) {
    toast({
      title: "Có lỗi xảy ra",
      description: error.message,
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  }
  const orderStatus = order?.orderStatus
    ? (order?.orderStatus.slice(-1)[0] as OrderStatus | undefined)
    : undefined;

  const statusColorBadge = useMemo(() => {
    return {
      [OrderStatus.PENDING]: "gray.200",
      [OrderStatus.PROCESSING]: "yellow.200",
      [OrderStatus.SHIPPING]: "blue.200",
      [OrderStatus.DELIVERED]: "green.200",
      [OrderStatus.CANCELLED]: "red.200",
    };
  }, []);
  const updateOrderMutation = useUpdateOrderStatus(id as string);
  const handleStatusChange = (nextStatus: OrderStatus) => {
    updateOrderMutation.mutate({
      orderId: id as string,
      orderStatus: nextStatus,
    });
  };

  if (isPending) return <OrderDetailSkeleton />;
  return (
    <main>
      <Card>
        <CardHeader className="bg-gray-200">
          <Text className="!font-bold text-xl">Chi tiết đơn hàng</Text>
        </CardHeader>
        <CardBody className="flex flex-col gap-10">
          <Table>
            <TableContainer>
              <Tbody>
                <Tr className="flex gap-10">
                  <Td className="min-w-[300px] font-semibold">ID</Td>
                  <Td className="text-wrap">{order?._id}</Td>
                </Tr>
                <Tr className="flex gap-10">
                  <Td className="min-w-[300px] font-semibold">Mã đơn hàng</Td>
                  <Td className="text-wrap">{order?.orderCode}</Td>
                </Tr>
                <Tr className="flex gap-10">
                  <Td className="min-w-[300px] font-semibold">
                    Trạng thái đơn hàng
                  </Td>
                  <Td className="text-wrap">
                    <Badge
                      variant="subtle"
                      bg={
                        orderStatus ? statusColorBadge[orderStatus] : "gray.200"
                      }
                    >
                      {orderStatus}
                    </Badge>
                  </Td>
                </Tr>

                <Tr className="flex gap-10">
                  <Td className="min-w-[300px] font-semibold">
                    Người nhận hàng
                  </Td>
                  <Td className="text-wrap">{order?.receiverName}</Td>
                </Tr>
                <Tr className="flex gap-10">
                  <Td className="min-w-[300px] font-semibold">
                    Địa chỉ nhận hàng
                  </Td>
                  <Td className="text-wrap">{order?.shippingAddress}</Td>
                </Tr>
                <Tr className="flex gap-10">
                  <Td className="min-w-[300px] font-semibold">
                    Số điện thoại nhận hàng
                  </Td>
                  <Td className="text-wrap">{order?.phoneNumber}</Td>
                </Tr>
              </Tbody>
            </TableContainer>
          </Table>
        </CardBody>
      </Card>
      <Card className="my-10">
        <CardHeader className="bg-gray-200">
          <Text className="!font-bold text-xl">Sản phẩm đã đặt</Text>
        </CardHeader>
        <CardBody className="flex flex-col gap-10">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Avatar</Th>
                  <Th>Tên sản phẩm</Th>
                  <Th>Đơn giá</Th>
                  <Th>Size</Th>
                  <Th>Số lượng</Th>
                  <Th>Sub-total</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {order?.orderItems.map((item) => {
                  return (
                    <Tr key={item._id}>
                      <Td>
                        <Image
                          className="rounded-lg"
                          src={item.product.avatar}
                          width={"80px"}
                          alt="Dan Abram"
                        />
                      </Td>
                      <Td>{item.product.name}</Td>
                      <Td>{formatMoneyVND(item.price)}</Td>
                      <Td>{item.variation.size}</Td>
                      <Td>{item.quantity}</Td>
                      <Td>{formatMoneyVND(item.price * item.quantity)}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
      <Card>
        <CardHeader className="bg-gray-200">
          <Text className="!font-bold text-xl">Thông tin thanh toán</Text>
        </CardHeader>
        <CardBody className="flex flex-col gap-10">
          <Table>
            <TableContainer>
              <Tbody>
                <Tr className="flex gap-10">
                  <Td className="min-w-[300px] font-semibold">
                    Phương thức thanh toán
                  </Td>
                  <Td className="text-wrap">
                    {order?.payment.paymentMethod ===
                    PaymentMethod.CASH_ON_DELIVERY
                      ? "COD"
                      : "Online banking"}
                  </Td>
                </Tr>

                <Tr className="flex gap-10">
                  <Td className="min-w-[300px] font-semibold">
                    Trạng thái thanh toán
                  </Td>
                  <Td className="text-wrap">
                    <Badge
                      variant="subtle"
                      bg={
                        order?.payment.paymentStatus === PaymentStatus.PAID
                          ? `green.200`
                          : "gray.200"
                      }
                    >
                      {order?.payment.paymentStatus}
                    </Badge>
                  </Td>
                </Tr>
                <Tr className="flex gap-10">
                  <Td className="min-w-[300px] font-semibold">
                    Phần trăm phí vận chuyển
                  </Td>
                  <Td className="text-wrap">
                    {order?.shippingFeePercentage || 0}%
                  </Td>
                </Tr>
                <Tr className="flex gap-10">
                  <Td className="min-w-[300px] font-semibold">
                    Phí vận chuyển
                  </Td>
                  <Td className="text-wrap">
                    {formatMoneyVND(order?.shippingFee || 0)}
                  </Td>
                </Tr>
                <Tr className="flex gap-10">
                  <Td className="min-w-[300px] font-semibold">
                    Tổng tiền hàng
                  </Td>
                  <Td className="text-wrap">
                    {formatMoneyVND(order?.totalPrice || 0)}
                  </Td>
                </Tr>
                <Tr className="flex gap-10">
                  <Td className="min-w-[300px] font-semibold">
                    Tổng giá trị đơn hàng
                  </Td>
                  <Td className="text-wrap">
                    {formatMoneyVND(order?.totalAmount || 0)}
                  </Td>
                </Tr>
              </Tbody>
            </TableContainer>
          </Table>
        </CardBody>
      </Card>
      <div className="flex justify-between mt-5 mb-20">
        <div>
          <PDFDownloadLink
            document={<OrderPDF order={order} />}
            fileName="invoice"
          >
            {({ loading }) => {
              return (
                <Button
                  colorScheme="teal"
                  isLoading={loading}
                  variant="outline"
                  size="md"
                >
                  Xuất PDF
                </Button>
              );
            }}
          </PDFDownloadLink>
        </div>
        {order && (
          <OrderStatusButton
            orderStatus={order?.orderStatus.slice(-1)[0] as OrderStatus}
            handleStatusChange={handleStatusChange}
          />
        )}
      </div>
    </main>
  );
}

export type OrderStatusButtonType = {
  orderStatus?: OrderStatus;
  handleStatusChange: (nextStatus: OrderStatus) => void;
};
export const OrderStatusButton = ({
  orderStatus,
  handleStatusChange,
}: OrderStatusButtonType) => {
  const isButtonVisible =
    orderStatus !== OrderStatus.DELIVERED &&
    orderStatus !== OrderStatus.CANCELLED;

  let buttonText = "";
  let nextStatus = undefined;
  let modalBodyText = "";
  switch (orderStatus) {
    case OrderStatus.PENDING:
      buttonText = "Xử lý đơn hàng";
      nextStatus = OrderStatus.PROCESSING;
      modalBodyText = "trạng thái đang xử lý";
      break;
    case OrderStatus.PROCESSING:
      buttonText = "Giao cho bên vận chuyển";
      nextStatus = OrderStatus.SHIPPING;
      modalBodyText = "trạng thái đang giao hàng";
      break;
    // case OrderStatus.SHIPPING:
    //   buttonText = "Đã giao hàng";
    //   nextStatus = OrderStatus.DELIVERED;
    //   break;
    default:
      break;
  }

  const handleClick = () => {
    if (nextStatus) {
      handleStatusChange(nextStatus);
    }
  };

  let colorButton = "";
  switch (nextStatus) {
    case OrderStatus.PROCESSING:
      colorButton = "yellow";
      break;
    case OrderStatus.SHIPPING:
      colorButton = "blue";
      break;
    default:
      break;
  }

  return isButtonVisible ? (
    <ModalConfirmChangeStatusOrderButton
      className="text-gray-800 border"
      variant="solid"
      colorScheme={colorButton}
      onClick={handleClick}
      buttonText={buttonText}
      modalBodyText={modalBodyText}
    />
  ) : null;
};
type ModalConfirmChangeStatusOrderButtonProps = {
  buttonText: string;
  className?: string;
  variant?: string;
  colorScheme?: string;
  modalBodyText?: string;
  onClick: () => void;
};
function ModalConfirmChangeStatusOrderButton({
  buttonText,
  className,
  variant,
  modalBodyText,
  colorScheme,
  onClick,
}: ModalConfirmChangeStatusOrderButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        className={className}
        colorScheme={colorScheme}
        variant={variant}
        onClick={onOpen}
      >
        {buttonText}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Xác nhận thay đổi trạng thái đơn hàng</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Bạn có chắc muốn chuyển đơn hàng sang {modalBodyText}?</p>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose} variant="ghost">
              Đóng
            </Button>
            <Button
              onClick={() => {
                onClick();
                onClose();
              }}
              colorScheme="teal"
            >
              Xác nhận
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function OrderDetailSkeleton() {
  return (
    <Stack padding={4} spacing={1}>
      <Skeleton className="h-[50px] mb-5">
        <Box>Hello World!</Box>
      </Skeleton>
      <Skeleton className="h-[50px] mb-5">
        <Box>Hello React!</Box>
      </Skeleton>
      <Skeleton className="h-[50px] mb-5">
        <Box>Hello ChakraUI!</Box>
      </Skeleton>
      <Skeleton className="h-[50px] mb-5">
        <Box>Hello World!</Box>
      </Skeleton>
      <Skeleton className="h-[50px] mb-5">
        <Box>Hello React!</Box>
      </Skeleton>
      <Skeleton className="h-[50px] mb-5">
        <Box>Hello ChakraUI!</Box>
      </Skeleton>
      <Skeleton className="h-[50px] mb-5">
        <Box>Hello World!</Box>
      </Skeleton>
      <Skeleton className="h-[50px] mb-5">
        <Box>Hello React!</Box>
      </Skeleton>
      <Skeleton className="h-[50px] mb-5">
        <Box>Hello ChakraUI!</Box>
      </Skeleton>
    </Stack>
  );
}
