import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { Order } from "../../types/order.type";
import { formatDate } from "../../utils/format-date";
import { formatMoneyVND } from "../../utils/format-money";
import { PaymentMethod } from "../../enum/order";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
      fontWeight: 300,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: 400,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
      fontWeight: 500,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: 600,
    },
  ],
});

const styles = StyleSheet.create({
  body: {
    padding: 30,
    fontFamily: "Roboto",
  },
  headerText: {
    textAlign: "center",
    fontWeight: 600,
    marginBottom: 20,
    fontSize: "25px",
  },
  text: {
    fontWeight: 400,
    marginTop: 10,
    fontSize: "12px",
  },
  sectionText: {
    fontWeight: 500,
    marginTop: 20,
    fontSize: "16px",
  },
  tableStyle: {
    marginTop: 20,
    display: "flex",
    fontSize: "12px",
    flexDirection: "column",
    width: "100%",
  },
  tableRow: {
    width: "100%",
    display: "flex",
    gap: "10px",
  },
  tableCell1: {
    width: "300px",
    color: "red",
  },
  tableCell2: {
    width: "40px",
    marginLeft: "30px",
  },
  tableCell3: {
    width: "200px",
    marginLeft: "30px",
  },

  table: {
    width: "100%",
  },
  headerTable: {
    width: "100%",
    fontWeight: 600,
    marginTop: "20px",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    borderTop: "1px solid #EEE",
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: "12px",
  },

  col1: {
    width: "60%",
    fontWeight: 500,
  },
  col2: {
    width: "15%",
  },
  col3: {
    width: "10%",
  },
  col4: {
    width: "25%",
  },
});

type OrderPDFProps = {
  order: Order | undefined;
};

export default function OrderPDF({ order }: OrderPDFProps) {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.headerText}>Hoá đơn bán hàng</Text>
        <Text style={styles.text}>Mã đơn hàng: {order?.orderCode}</Text>
        <Text style={styles.text}>Người nhận hàng: {order?.receiverName}</Text>
        <Text style={styles.text}>Địa chỉ: {order?.shippingAddress}</Text>
        <Text style={styles.text}>Số điện thoại: {order?.phoneNumber}</Text>
        <Text style={styles.text}>
          Ngày tạo: {formatDate(order?.createdAt as string)}
        </Text>
        <Text style={styles.sectionText}>Các sản phẩm đã mua</Text>
        <View style={styles.headerTable}>
          <View style={styles.row}>
            <Text style={styles.col1}>Tên sản phẩm </Text>
            <Text style={styles.col2}>Số lượng</Text>
            <Text style={styles.col3}>Size</Text>
            <Text style={styles.col4}>Đơn giá</Text>
          </View>
        </View>
        {order?.orderItems?.map((item) => (
          <View key={item._id} style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.col1}>{item.product.name} </Text>
              <Text style={styles.col2}>x {item.quantity}</Text>
              <Text style={styles.col3}>{item.variation.size}</Text>
              <Text style={styles.col4}>
                {formatMoneyVND(item.variation.salePrice as number)}
              </Text>
            </View>
          </View>
        ))}
        <Text style={styles.sectionText}>Thông tin thanh toán</Text>
        <Text style={styles.text}>
          Phương thức thanh toán:{" "}
          {order?.payment.paymentMethod === PaymentMethod.CASH_ON_DELIVERY
            ? "COD"
            : "Thanh toán online"}
        </Text>
        <Text style={styles.text}>
          Phần trăm phí vận chuyển: {order?.shippingFeePercentage} %
        </Text>
        <Text style={styles.text}>
          Phí vận chuyển: {formatMoneyVND(order?.shippingFee as number)}
        </Text>
        <Text style={styles.text}>
          Tổng tiền hàng: {formatMoneyVND(order?.totalPrice as number)}
        </Text>
        <Text style={styles.text}>
          Tổng giá trị đơn hàng: {formatMoneyVND(order?.totalAmount as number)}
        </Text>
      </Page>
    </Document>
  );
}
