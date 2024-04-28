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
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
export default function ProductListingTable() {
  return (
    <TableContainer className="min-h-[450px]">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Avatar</Th>
            <Th>Tên sản phẩm</Th>
            <Th>Giá bán</Th>
            <Th>Giá gốc</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {Array.from({ length: 5 }).map((_, i) => (
            <Tr key={i}>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td>25.4</Td>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td width={"150px"}>
                <div className="flex gap-5">
                  <Button variant={"outline"} colorScheme="blue">
                    <FaEye />
                  </Button>
                  <Button variant={"outline"} colorScheme="red">
                    <FaRegTrashAlt />
                  </Button>
                </div>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
