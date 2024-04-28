import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { createCategory } from "../../apis/category-services";
import { OrderBy, SortBy } from "../../enum/sort.enum";
import { SortOption } from "../../pages/categories-page";
import MultipleUpload from "./multiple-upload";
import SingleUploadAvatar from "./single-upload";
export const productSortOptions = [
  {
    label: "Giá bán (tăng dần)",
    value: JSON.stringify({ sortBy: SortBy.CREATED_AT, orderBy: OrderBy.ASC }),
  },
  {
    label: "Giá bán (giảm dần)",
    value: JSON.stringify({ sortBy: SortBy.CREATED_AT, orderBy: OrderBy.DESC }),
  },
  {
    label: "Ngày tạo (mới nhất)",
    value: JSON.stringify({ sortBy: SortBy.CREATED_AT, orderBy: OrderBy.DESC }),
  },
  {
    label: "Ngày tạo (cũ nhất)",
    value: JSON.stringify({ sortBy: SortBy.CREATED_AT, orderBy: OrderBy.ASC }),
  },
];

export type HeaderProductsListingPageProps = {
  sortOption?: SortOption;
  setSortOption: React.Dispatch<React.SetStateAction<SortOption | undefined>>;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
};

export default function HeaderProductsListingPage({
  setSortOption,
  sortOption,
  setSearchKeyword,
}: HeaderProductsListingPageProps) {
  const {
    isOpen: isCreateProductModalOpen,
    onOpen: openAddProductModal,
    onClose: closeAddProductModal,
  } = useDisclosure();
  const handleChangeSortOption = (value: string) => {
    setSortOption(JSON.parse(value));
  };
  return (
    <div className="flex justify-between mt-5 mb-10">
      <div className="bg-white rounded-md">
        <Select
          placeholder="Sắp xếp theo"
          onChange={(e) => handleChangeSortOption(e.target.value)}
        >
          {productSortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              selected={JSON.stringify(sortOption) === option.value}
            >
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex gap-10 align-middle">
        <div className="relative">
          <Input
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Nhập từ khoá sản phẩm"
            size="md"
            width={400}
          />
          <HiMagnifyingGlass className="absolute top-3 right-3" />
        </div>

        <Button colorScheme="teal" size="md" onClick={openAddProductModal}>
          Thêm mới sản phẩm
        </Button>
      </div>

      <ModalAddNewProduct
        isOpen={isCreateProductModalOpen}
        onClose={closeAddProductModal}
      />
    </div>
  );
}

export type ModalAddNewProductProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ModalAddNewProduct({
  isOpen,
  onClose,
}: ModalAddNewProductProps) {
  const [categoryName, setCategoryName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const queryClient = useQueryClient();

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setIsLoading(false);
      onClose();
      toast({
        title: "Thêm mới thành công",
        description: "Một danh mục mới vừa được thêm vào",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
      setCategoryName("");
    },
    onError: () => {
      throw new Error("Failed to create category");
    },
  });
  async function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    createCategoryMutation.mutate(categoryName);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmitForm}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thêm mới sản phẩm</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Tên sản phẩm</FormLabel>
              <Input
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Nhập tên sản phẩm"
              />
            </FormControl>

            <FormControl as="fieldset" mt={5}>
              <FormLabel as="legend">Active?</FormLabel>
              <RadioGroup defaultValue="Itachi">
                <HStack spacing="24px">
                  <Radio value="Sasuke">False</Radio>
                  <Radio value="Nagato">True</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl as="fieldset" mt={5}>
              <FormLabel as="legend">Là sản phẩm hot?</FormLabel>
              <RadioGroup defaultValue="Itachi">
                <HStack spacing="24px">
                  <Radio value="Sasuke">False</Radio>
                  <Radio value="Nagato">True</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl as="fieldset" mt={5}>
              <FormLabel as="legend">Mô tả sản phẩm</FormLabel>
              <Textarea rows={5} placeholder="Nhập mô tả sản phẩm" />
            </FormControl>

            <FormControl as="fieldset" mt={5}>
              <FormLabel as="legend">Danh mục</FormLabel>
              <Textarea rows={5} placeholder="Nhập mô tả sản phẩm" />
            </FormControl>

            <FormControl as="fieldset" mt={5}>
              <FormLabel as="legend">Tải lên avatar</FormLabel>
              <SingleUploadAvatar />
            </FormControl>

            <FormControl as="fieldset" mt={5}>
              <FormLabel as="legend">Tải lên các ảnh</FormLabel>
              <MultipleUpload />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Huỷ
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              isDisabled={!categoryName.length}
              colorScheme="teal"
            >
              Lưu
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
