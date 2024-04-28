import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { FaPen } from "react-icons/fa";
import * as Yup from "yup";
import { useEditVariation } from "../../apis/queries/useEditVariation";
import { UpdateVariationType } from "../../apis/variation-service";

const regexNumberPattern = /^[0-9]+$/;

const validationSchema = Yup.object().shape({
  size: Yup.string().required("Size là bắt buộc"),
  availableQuantity: Yup.number()
    .required("Số lượng phẩm là bắt buộc")
    .positive("Số lượng phẩm phải lớn hơn 0"),
  unitPrice: Yup.number()
    .required("Giá gốc là bắt buộc")
    .positive("Giá sản phẩm phải lớn hơn 0"),
});

export type UpdateVariationModalButtonType = {
  variationData: UpdateVariationType;
};

export function UpdateVariationModalButton({
  variationData,
}: UpdateVariationModalButtonType) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const updateVariationMutation = useEditVariation(
    variationData.productId as string
  );

  const initialValues: UpdateVariationType = {
    size: variationData.size,
    availableQuantity: variationData.availableQuantity,
    unitPrice: variationData.unitPrice,
    salePrice: variationData.salePrice,
    _id: variationData._id,
  };

  const { values, errors, setFieldValue, resetForm, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const valuesToSubmit: UpdateVariationType = {
        _id: variationData._id,
        salePrice:
          values.salePrice !== undefined
            ? Number(values.salePrice)
            : Number(values.unitPrice),
        size: String(values.size),
        availableQuantity: Number(values.availableQuantity),
        unitPrice: Number(values.unitPrice),
      };
      updateVariationMutation.mutate(valuesToSubmit);
      resetForm();
      onClose();
    },
  });
  return (
    <>
      <Button colorScheme="blue" variant="outline" onClick={onOpen}>
        <FaPen />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader>Cập nhật biến thể</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl className="mb-5" isInvalid={!!errors.size}>
                <FormLabel>Size</FormLabel>
                <Input
                  value={values.size}
                  onChange={(e) => {
                    if (!e.target.value.match(regexNumberPattern)) return;
                    setFieldValue("size", e.target.value);
                  }}
                />
                <FormErrorMessage>{errors.size}</FormErrorMessage>
              </FormControl>
              <FormControl
                className="mb-5"
                isInvalid={!!errors.availableQuantity}
              >
                <FormLabel>Số lượng</FormLabel>
                <Input
                  value={values.availableQuantity}
                  onChange={(e) => {
                    if (!e.target.value.match(regexNumberPattern)) return;
                    setFieldValue("availableQuantity", e.target.value);
                  }}
                />
                <FormErrorMessage>{errors.availableQuantity}</FormErrorMessage>
              </FormControl>
              <FormControl className="mb-5" isInvalid={!!errors.unitPrice}>
                <FormLabel>Giá gốc</FormLabel>
                <Input
                  value={values.unitPrice}
                  onChange={(e) => {
                    if (!e.target.value.match(regexNumberPattern)) return;
                    setFieldValue("unitPrice", e.target.value);
                  }}
                />
                <FormErrorMessage>{errors.unitPrice}</FormErrorMessage>
              </FormControl>
              <FormControl className="mb-5">
                <FormLabel>Giá bán</FormLabel>
                <Input
                  value={values.salePrice}
                  onChange={(e) => {
                    if (!e.target.value.match(regexNumberPattern)) return;
                    setFieldValue("salePrice", e.target.value);
                  }}
                />
                <FormHelperText>
                  Giá bán sẽ bằng giá gốc nếu không nhập
                </FormHelperText>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                colorScheme="teal"
                isLoading={updateVariationMutation.isPending}
                isDisabled={
                  !!errors.availableQuantity ||
                  !!errors.unitPrice ||
                  !!errors.size ||
                  JSON.stringify(initialValues) === JSON.stringify(values)
                }
                type="submit"
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
