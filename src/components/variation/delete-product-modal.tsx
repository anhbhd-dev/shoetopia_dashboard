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
import { useDeleteVariation } from "../../apis/queries/useDeleteVariation";
import { Variation } from "../../types/variation.type";
import { useParams } from "react-router-dom";

export type DeleteVariationProps = {
  variation: Variation;
};

export default function DeleteVariationModalButton({
  variation,
}: DeleteVariationProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const deleteVariationMutation = useDeleteVariation(useParams().id as string);
  const { id } = useParams();
  const handleDeleteVariation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteVariationMutation.mutate({
      productId: id as string,
      id: variation._id,
    });
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
          <form onSubmit={handleDeleteVariation}>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Xoá biến thể
              </AlertDialogHeader>

              <AlertDialogBody>
                Bạn có chắc chắn muốn xoá biến thể này không?
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
                  isLoading={deleteVariationMutation.isPending}
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
