import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  Checkbox,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FaPen } from "react-icons/fa";
import { Category } from "../../types/category.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "../../apis/category-services";
import { useState } from "react";
import { useProducts } from "../../apis/queries/useProducts";

export type ModalEditCategoryProps = {
  category: Category;
};

export function ModalEditCategory({ category }: ModalEditCategoryProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [categoryName, setCategoryName] = useState<string>(category.name);
  const [isShowAtHomePage, setIsShowAtHomePage] = useState<boolean>(
    category.isShowAtHomePage ?? false
  );
  const { data: productsInThisCategories } = useProducts({
    categories: category._id,
  });
  const updateCategoryMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({
        title: "Cập nhật thành công",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Cập nhật thất bại",
        description: error.message,
        status: "error",
        duration: 1500,
        isClosable: true,
      });
      onClose();
    },
  });

  const handleUpdateCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCategoryMutation.mutate({
      _id: category._id,
      categoryName,
      isShowAtHomePage,
    });
  };

  return (
    <>
      <Button colorScheme="blue" variant="outline" onClick={onOpen}>
        <FaPen />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay onClick={onClose} />
        <ModalContent>
          <form onSubmit={handleUpdateCategory}>
            <ModalHeader>Cập nhật danh mục</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Tên danh mục</FormLabel>
                <Input
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Tên danh mục"
                  value={categoryName}
                />
              </FormControl>
              <FormControl
                className="mt-4 "
                isInvalid={!productsInThisCategories?.products?.length}
              >
                <div className="flex items-center">
                  <FormLabel>Hiển thị ở trang chủ?</FormLabel>
                  <Checkbox
                    isDisabled={!productsInThisCategories?.products.length}
                    isChecked={isShowAtHomePage}
                    onChange={() => setIsShowAtHomePage(!isShowAtHomePage)}
                    value={categoryName}
                  />
                </div>
                <FormErrorMessage>
                  Không thể show ở trang chủ vì danh mục này chưa có sản phẩm
                  nào
                </FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Huỷ
              </Button>
              <Button type="submit" colorScheme="teal">
                Lưu
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
