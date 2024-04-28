import {
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import DeleteCategoryModal from "./delete-category-modal";
import { ModalEditCategory } from "./edit-category-modal";
import { Category } from "../../types/category.type";
import { formatDate } from "../../utils/format-date";

export type CategoriesListingProps = {
  categories: Category[];
};

export default function CategoriesListing({
  categories,
}: CategoriesListingProps) {
  return (
    <>
      <TableContainer
        className={categories.length > 0 ? "min-h-[400px]" : "min-h-[100px]"}
      >
        <Table variant="simple" className="bg-white rounded-md">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Tên danh mục</Th>
              <Th>Ngày tạo</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map((category) => (
              <Tr key={category._id}>
                <Td>{category._id.slice(0, 10)}</Td>
                <Td>{category.name}</Td>
                <Td>{formatDate(category.createdAt)}</Td>
                <Td width={"200px"}>
                  <div className="flex gap-4">
                    <ModalEditCategory category={category} />
                    <DeleteCategoryModal category={category} />
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {categories.length === 0 && (
        <p className="text-center">Không tìm thấy kết quả tương ứng</p>
      )}
    </>
  );
}

export function CategoryListingSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton className="mb-5 h-14" key={i}>
          <div>contents wrapped</div>
        </Skeleton>
      ))}
      <div className="flex justify-end gap-2 mt-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton className="w-10 h-10 mb-5" key={i}>
            <div>contents wrapped</div>
          </Skeleton>
        ))}
      </div>
    </>
  );
}
