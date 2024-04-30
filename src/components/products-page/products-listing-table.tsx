import {
  Badge,
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
import { Product } from "../../types/product.type";
import { formatDate } from "../../utils/format-date";
import DeleteProductModal from "./delete-product-modal";
import { Link } from "react-router-dom";
import { Image } from "antd";
export type ProductsListingProps = {
  products: Product[];
};

export default function ProductListingTable({
  products,
}: ProductsListingProps) {
  return (
    <>
      <TableContainer
        className={products.length > 0 ? "min-h-[450px]" : "min-h-[100px]"}
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Avatar</Th>
              <Th>Tên sản phẩm</Th>
              <Th>Ngày tạo</Th>
              <Th>Trạng thái</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {products?.map((item) => (
              <Tr key={item._id}>
                <Td className="w-[200px]">{item._id.slice(0, 10)}</Td>
                <Td width={"140px"}>
                  <Image
                    className="rounded-lg"
                    src={item.avatar}
                    width={"80px"}
                  />
                </Td>
                <Td>{item.name}</Td>
                <Td>{formatDate(item.createdAt)}</Td>
                <Td className="uppercase">
                  {item?.isActive ? (
                    <Badge ml="1" colorScheme="green">
                      Active
                    </Badge>
                  ) : (
                    <Badge ml="1" colorScheme="red">
                      Inactive
                    </Badge>
                  )}
                </Td>
                <Td width={"150px"}>
                  <div className="flex gap-5">
                    <Link to={`${item._id}`}>
                      <Button variant={"outline"} colorScheme="blue">
                        <FaEye />
                      </Button>
                    </Link>
                    <DeleteProductModal product={item} />
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {products?.length === 0 && (
        <p className="mt-20 text-center">Không tìm thấy kết quả tương ứng</p>
      )}
    </>
  );
}
