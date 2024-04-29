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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useCategories } from "../../apis/queries/useCategories";
import { useEditProduct } from "../../apis/queries/useEditProduct";
import { Category } from "../../types/category.type";
import { Product } from "../../types/product.type";
export type ModalUpdateProductProps = {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  isLoadingProduct: boolean;
};
const validationCreateProductSchema = Yup.object().shape({
  name: Yup.string().required("Tên sản phẩm là bắt buộc").trim(),
  description: Yup.string()
    .min(20, "Mô tả dài ít nhất 20 ký tự")
    .required("Mô tả là bắt buộc")
    .trim(),
  isHot: Yup.boolean(),
  isActive: Yup.boolean(),
  categoryId: Yup.string().required("Danh mục là bắt buộc"),
});
export function ModalEditProduct({
  product,
  isOpen,
  onClose,
  isLoadingProduct,
}: ModalUpdateProductProps) {
  const [categorySearchKeyword, setCategorySearchKeyword] =
    useState<string>("");

  const { data, isError, isPending } = useCategories({
    name: categorySearchKeyword,
    limit: 20,
  });
  const { id: productId } = useParams();
  const editProductMutation = useEditProduct(productId as string);
  const { values, setValues, errors, handleChange, handleSubmit, resetForm } =
    useFormik({
      initialValues:
        {
          ...product,
          categoryId: product?.category?._id,
        } ?? {},
      validationSchema: validationCreateProductSchema,
      onSubmit: async (values) => {
        editProductMutation.mutate({
          ...values,
          isActive: !!values?.isActive,
          isHot: !!values?.isHot,
          productId: productId as string,
        });
        onClose();
        resetForm();
      },
    });
  useEffect(() => {
    setValues({
      name: product?.name,
      description: product?.description,
      isHot: product?.isHot,
      isActive: product?.isActive,
      categoryId: product?.category?._id,
    });
  }, [product, setValues]);

  if (isLoadingProduct) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cập nhật sản phẩm</ModalHeader>
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
              <RadioGroup
                onChange={handleChange("isActive")}
                defaultValue={values?.isActive ? "true" : "false"}
              >
                <HStack spacing="24px">
                  <Radio value="false">False</Radio>
                  <Radio isDisabled={!product?.variations?.length} value="true">
                    True
                  </Radio>
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl as="fieldset" mt={5}>
              <FormLabel as="legend">Là sản phẩm hot?</FormLabel>
              <RadioGroup
                onChange={handleChange("isHot")}
                defaultValue={values?.isHot ? "true" : "false"}
              >
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
                value={values?.description}
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
                value={values?.categoryId}
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
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Huỷ
            </Button>
            <Button
              type="submit"
              isLoading={false}
              isDisabled={
                Boolean(errors.name) ||
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
