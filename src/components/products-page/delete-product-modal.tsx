import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDeleteProduct } from "../../apis/queries/useDeleteProduct";
import { Product } from "../../types/product.type";

export type DeleteProductProps = {
  product: Product;
};

export default function DeleteProductModal({ product }: DeleteProductProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const deleteProductMutation = useDeleteProduct();

  const handleDeleteCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteProductMutation.mutate(product._id);
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
                Xoá sản phẩm
              </AlertDialogHeader>

              <AlertDialogBody>
                Bạn có chắc chắn muốn xoá sản phẩm này không?
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
                  isLoading={deleteProductMutation.isPending}
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
