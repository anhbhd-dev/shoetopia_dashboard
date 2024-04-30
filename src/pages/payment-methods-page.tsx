import {
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { Image } from "antd";
import {
  useSinglePaymentMethod,
  useUpdatePaymentMethodStatus,
} from "../apis/queries/usePaymentMethods";
import { PaymentMethod } from "../enum/order";

export default function PaymentMethodsPage() {
  const { isError: VNPAYERROR, data: VNPAYDATA } = useSinglePaymentMethod(
    PaymentMethod.VNPAY
  );

  const { isError: ZALOPAYERROR, data: ZALOPAYDATA } = useSinglePaymentMethod(
    PaymentMethod.ZALOPAY
  );

  const updateVNPayMutation = useUpdatePaymentMethodStatus(PaymentMethod.VNPAY);
  const updateZaloPayMutation = useUpdatePaymentMethodStatus(
    PaymentMethod.ZALOPAY
  );

  const handleUpdateStatus = (paymentMethod: PaymentMethod) => {
    if (paymentMethod === PaymentMethod.VNPAY) {
      updateVNPayMutation.mutate({
        name: PaymentMethod.VNPAY,
        isEnabled: !VNPAYDATA?.isEnabled,
      });
    }
    if (paymentMethod === PaymentMethod.ZALOPAY) {
      updateZaloPayMutation.mutate({
        name: PaymentMethod.ZALOPAY,
        isEnabled: !ZALOPAYDATA?.isEnabled,
      });
    }
  };
  const toast = useToast();
  if (VNPAYERROR || ZALOPAYERROR) {
    toast({
      title: "Có lỗi xảy ra",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  }

  return (
    <main>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Tên phương thức</Th>
              <Th>Tắt / Bật</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td className="w-[300px]">
                <Image src="/images/vnpay-logo.jpg" />
              </Td>
              <Td>Thanh toán bằng ví VNPAY</Td>
              <Td>
                <Switch
                  onChange={() => handleUpdateStatus(PaymentMethod.VNPAY)}
                  isChecked={VNPAYDATA?.isEnabled}
                  size="lg"
                />
              </Td>
            </Tr>
            <Tr>
              <Td className="w-[300px]">
                <Image src="/images/zalopay-logo.jpg" />
              </Td>
              <Td>Thanh toán bằng ví ZaloPay</Td>
              <Td>
                <Switch
                  onChange={() => handleUpdateStatus(PaymentMethod.ZALOPAY)}
                  isChecked={ZALOPAYDATA?.isEnabled}
                  size="lg"
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </main>
  );
}
