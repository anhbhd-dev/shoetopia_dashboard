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
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { SortOption } from "../../pages/categories-page";
import { OrderBy, SortBy } from "../../enum/sort.enum";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../../apis/category-services";

const sortOptions = [
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

export type CategoryHeaderProps = {
  sortOption?: SortOption;
  setSortOption: React.Dispatch<React.SetStateAction<SortOption | undefined>>;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
};

export default function HeaderProductsListingPage({
  setSortOption,
  setSearchKeyword,
}: CategoryHeaderProps) {
  const {
    isOpen: isCreateCategoryModalOpen,
    onOpen: openAddCategoryModal,
    onClose: closeAddCategoryModal,
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
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex gap-10 align-middle">
        <div className="relative">
          <Input
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Nhập tên danh mục"
            size="md"
            width={400}
          />
          <HiMagnifyingGlass className="absolute top-3 right-3" />
        </div>

        <Button colorScheme="teal" size="md" onClick={openAddCategoryModal}>
          Thêm mới danh mục
        </Button>
      </div>

      <ModalAddNewCategory
        isOpen={isCreateCategoryModalOpen}
        onClose={closeAddCategoryModal}
      />
    </div>
  );
}

export type ModalAddNewCategoryProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ModalAddNewCategory({
  isOpen,
  onClose,
}: ModalAddNewCategoryProps) {
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
          <ModalHeader>Thêm mới danh mục</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Tên danh mục</FormLabel>
              <Input
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Category name"
              />
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
