import {
  Button,
  FormControl,
  FormErrorMessage,
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
import { useEffect, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { createCategory } from "../../apis/category-services";
import { useCategories } from "../../apis/queries/useCategories";
import { OrderBy, SortBy } from "../../enum/sort.enum";
import { SortOption } from "../../pages/categories-page";
import { Category } from "../../types/category.type";
import MultipleUpload from "./multiple-upload";
import SingleUploadAvatar from "./single-upload";

import { useFormik } from "formik";
import * as Yup from "yup";

// eslint-disable-next-line react-refresh/only-export-components
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
        <Select onChange={(e) => handleChangeSortOption(e.target.value)}>
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

const validationCreateProductSchema = Yup.object().shape({
  name: Yup.string().required("Tên sản phẩm là bắt buộc"),
  description: Yup.string()
    .min(20, "Mô tả dài ít nhất 20 ký tự")
    .required("Mô tả là bắt buộc"),
  isHot: Yup.boolean(),
  isActive: Yup.boolean(),
  categoryId: Yup.string().required("Danh mục là bắt buộc"),
  avatar: Yup.string().required("Ảnh đại diện sản phẩm là bắt buộc"),
  images: Yup.array()
    .of(Yup.string())
    .min(1, "Cần upload ít nhất 1 ảnh")
    .required("Ảnh sản phẩm là bắt buộc"),
});

const initialValues = {
  name: "",
  description: "",
  isHot: false,
  isActive: false,
  categoryId: "",
  avatar: "",
  images: [],
};

export type ModalAddNewProductProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ModalAddNewProduct({
  isOpen,
  onClose,
}: ModalAddNewProductProps) {
  const [categoryName, setCategoryName] = useState<string>("");
  const [categorySearchKeyword, setCategorySearchKeyword] =
    useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data, isError, isPending } = useCategories({
    name: categorySearchKeyword,
    limit: 20,
  });

  const { values, errors, handleChange, setFieldValue } = useFormik({
    initialValues: initialValues,
    validationSchema: validationCreateProductSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

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
  useEffect(() => {
    setFieldValue("categoryId", data?.categories[0]?._id);
  }, [data?.categories, setFieldValue]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmitForm}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thêm mới sản phẩm</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired isInvalid={Boolean(errors?.name)}>
              <FormLabel>Tên sản phẩm</FormLabel>
              <Input
                value={values?.name}
                onChange={handleChange("name")}
                placeholder="Nhập tên sản phẩm"
              />
              <FormErrorMessage>{errors?.name}</FormErrorMessage>
            </FormControl>

            <FormControl as="fieldset" mt={5}>
              <FormLabel as="legend">Active?</FormLabel>
              <RadioGroup defaultValue="false">
                <HStack spacing="24px">
                  <Radio value="false">False</Radio>
                  <Radio isDisabled value="true">
                    True
                  </Radio>
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl as="fieldset" mt={5}>
              <FormLabel as="legend">Là sản phẩm hot?</FormLabel>
              <RadioGroup defaultValue="false">
                <HStack spacing="24px">
                  <Radio value="false">False</Radio>
                  <Radio value="true">True</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl
              as="fieldset"
              mt={5}
              isInvalid={Boolean(errors?.description)}
            >
              <FormLabel as="legend">Mô tả sản phẩm</FormLabel>
              <Textarea
                rows={5}
                placeholder="Nhập mô tả sản phẩm"
                value={values.description}
                onChange={handleChange("description")}
              />
              <FormErrorMessage>{errors?.description}</FormErrorMessage>
            </FormControl>

            <FormControl
              as="fieldset"
              mt={5}
              isInvalid={Boolean(errors?.categoryId)}
            >
              <Input
                placeholder="Nhập từ khoá danh mục"
                onChange={(e) => setCategorySearchKeyword(e.target.value)}
                className="mb-4"
                value={categorySearchKeyword}
              />
              <FormLabel as="legend">Danh mục</FormLabel>
              <Select
                isDisabled={isError || isPending}
                value={values.categoryId}
                onChange={handleChange("categoryId")}
              >
                {data?.categories?.map((category: Category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors?.categoryId}</FormErrorMessage>
            </FormControl>

            <FormControl
              as="fieldset"
              mt={5}
              isInvalid={Boolean(errors?.avatar)}
            >
              <FormLabel as="legend">Tải lên avatar</FormLabel>
              <SingleUploadAvatar onSetFieldValue={setFieldValue} />
              <FormErrorMessage>{errors?.avatar}</FormErrorMessage>
            </FormControl>

            <FormControl
              as="fieldset"
              mt={5}
              isInvalid={Boolean(errors?.images)}
            >
              <FormLabel as="legend">Tải lên các ảnh</FormLabel>
              <MultipleUpload onSetFieldValue={setFieldValue} />
              <FormErrorMessage>{errors?.images}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Huỷ
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              isDisabled={
                Boolean(errors.name) ||
                Boolean(errors.avatar) ||
                Boolean(errors.images) ||
                Boolean(errors.categoryId) ||
                Boolean(errors.description) ||
                Boolean(errors.isActive) ||
                Boolean(errors.isHot)
              }
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
