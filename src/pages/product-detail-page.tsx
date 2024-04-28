import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Image } from "antd";
import { useParams } from "react-router-dom";
import { useSingleProduct } from "../apis/queries/useSingleProduct";
import { AddVariationModalButton } from "../components/variation/add-variation-modal";
import DeleteVariationModalButton from "../components/variation/delete-product-modal";
import { UpdateVariationModalButton } from "../components/variation/update-variation-modal";
import { formatDate } from "../utils/format-date";
import { formatMoneyVND } from "../utils/format-money";
export default function ProductDetailPage() {
  const { id } = useParams();
  const { data: product } = useSingleProduct(id as string);

  return (
    <main>
      <Card>
        <CardHeader className="bg-gray-100">
          <h1 className="text-lg font-bold uppercase">Chi tiết sản phẩm</h1>
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table variant="simple">
              <Tbody>
                <Tr>
                  <Td className="w-[200px]">ID</Td>
                  <Td>{product?._id}</Td>
                </Tr>
                <Tr>
                  <Td className="w-[200px]">Tên sản phẩm</Td>
                  <Td>{product?.name}</Td>
                </Tr>
                <Tr>
                  <Td className="w-[200px]">Is hot</Td>
                  <Td className="uppercase ">{String(product?.isHot)}</Td>
                </Tr>
                <Tr>
                  <Td className="w-[200px]">Status</Td>
                  <Td className="uppercase ">
                    {product?.isActive ? (
                      <Badge ml="1" colorScheme="green">
                        Active
                      </Badge>
                    ) : (
                      <Badge ml="1" colorScheme="red">
                        Inactive
                      </Badge>
                    )}
                  </Td>
                </Tr>
                <Tr>
                  <Td className="w-[200px]">Mô tả</Td>
                  <Td>
                    <p className="leading-6 text-wrap">
                      {product?.description}
                    </p>
                  </Td>
                </Tr>
                <Tr>
                  <Td className="w-[200px]">Danh mục</Td>
                  <Td>{product?.category.name}</Td>
                </Tr>
                <Tr>
                  <Td className="w-[200px]">Ngày tạo</Td>
                  <Td>{formatDate(product?.createdAt as string)}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>

      <Card className="mt-10">
        <CardHeader className="bg-gray-100">
          <h1 className="text-lg font-bold uppercase">Avatar</h1>
        </CardHeader>
        <CardBody>
          <div className="border rounded-md">
            <Image srcSet={product?.avatar} width={150} />
          </div>
        </CardBody>
      </Card>

      <Card className="mt-10">
        <CardHeader className="bg-gray-100">
          <h1 className="text-lg font-bold uppercase">Hình ảnh sản phẩm</h1>
        </CardHeader>
        <CardBody>
          <div className="flex gap-4 border rounded-md">
            {product?.images.map((image) => (
              <Image key={image} srcSet={image} width={150} />
            ))}
          </div>
        </CardBody>
      </Card>

      <Card className="my-10">
        <CardHeader className="flex justify-between bg-gray-100">
          <h1 className="text-lg font-bold uppercase">Variations</h1>
          <AddVariationModalButton />
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table variant="simple">
              {product?.variations.length !== 0 ? (
                <Thead>
                  <Tr className="font-semibold">
                    <Td>Kích cỡ</Td>
                    <Td>Số lượng trong kho</Td>
                    <Td>Giá gốc</Td>
                    <Td>Giá bán</Td>
                    <Td></Td>
                  </Tr>
                </Thead>
              ) : (
                <p>Hiện tại chưa có biến thể nào cho sản phẩm này</p>
              )}

              <Tbody>
                {product?.variations.map((variation) => (
                  <Tr key={variation._id}>
                    <Td>{variation.size}</Td>
                    <Td>{variation.availableQuantity}</Td>
                    <Td>{formatMoneyVND(variation.unitPrice)}</Td>
                    <Td>{formatMoneyVND(variation.salePrice)}</Td>
                    <Td className="w-[100px]">
                      <div className="flex gap-2">
                        <UpdateVariationModalButton variationData={variation} />
                        <DeleteVariationModalButton variation={variation} />
                      </div>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </main>
  );
}
