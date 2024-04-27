import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Category } from "../../types/category.type";
import { useDeleteCategories } from "../../apis/queries/useDeleteCategories";

export type DeleteCategoryProps = {
  category: Category;
};

export default function DeleteCategoryModal({ category }: DeleteCategoryProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const deleteCategoryMutation = useDeleteCategories();

  const handleDeleteCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteCategoryMutation.mutate(category._id);
    onClose();
  };

  return (
    <>
      <Button colorScheme="red" variant="outline" onClick={onOpen}>
        <FaRegTrashAlt />
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <form onSubmit={handleDeleteCategory}>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Xoá danh mục
              </AlertDialogHeader>

              <AlertDialogBody>
                Bạn có chắc chắn muốn xoá danh mục này không?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Huỷ
                </Button>
                <Button
                  type="submit"
                  colorScheme="red"
                  onClick={onClose}
                  ml={3}
                >
                  Xoá
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </form>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
