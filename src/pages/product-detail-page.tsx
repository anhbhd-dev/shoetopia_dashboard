import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
  useDisclosure,
  Skeleton,
} from "@chakra-ui/react";
import { Image } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEditProduct } from "../apis/queries/useEditProduct";
import { useSingleProduct } from "../apis/queries/useSingleProduct";
import { ModalEditProduct } from "../components/product-detail/edit-product";
import { MultipleUpdateImages } from "../components/products-page/multiple-upload";
import { SingleUpdateAvatar } from "../components/products-page/single-upload";
import { AddVariationModalButton } from "../components/variation/add-variation-modal";
import DeleteVariationModalButton from "../components/variation/delete-product-modal";
import { UpdateVariationModalButton } from "../components/variation/update-variation-modal";
import { formatDate } from "../utils/format-date";
import { formatMoneyVND } from "../utils/format-money";
import { uploadToCloudinary } from "../utils/upload-to-cloudinary";
export default function ProductDetailPage() {
  const { id } = useParams();
  const { data: product, isPending } = useSingleProduct(id as string);
  const {
    isOpen: isOpenEditProduct,
    onOpen: onOpenEditProduct,
    onClose: onCloseEditProduct,
  } = useDisclosure();

  const {
    isOpen: isOpenEditAvatar,
    onOpen: onOpenEditAvatar,
    onClose: onCloseEditAvatar,
  } = useDisclosure();

  const {
    isOpen: isOpenEditImages,
    onOpen: onOpenEditImages,
    onClose: onCloseEditImages,
  } = useDisclosure();

  if (isPending) return <ProductDetailSkeleton />;

  return (
    <main>
      <ModalEditProduct
        isOpen={isOpenEditProduct}
        onClose={onCloseEditProduct}
        product={product}
        isLoadingProduct={isPending}
      />
      <Card>
        <CardHeader className="flex justify-between bg-gray-100">
          <h1 className="text-lg font-bold uppercase">Chi tiết sản phẩm</h1>
          <Button
            onClick={onOpenEditProduct}
            className="text-sm uppercase"
            colorScheme="teal"
            variant="outline"
          >
            Edit
          </Button>
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table variant="simple">
              <Tbody>
                <Tr>
                  <Td className="w-[200px]">ID</Td>
                  <Td>{product?._id}</Td>
                </Tr>
                <Tr>
                  <Td className="w-[200px]">Tên sản phẩm</Td>
                  <Td>{product?.name}</Td>
                </Tr>
                <Tr>
                  <Td className="w-[200px]">Is hot</Td>
                  <Td className="uppercase ">{String(product?.isHot)}</Td>
                </Tr>
                <Tr>
                  <Td className="w-[200px]">Status</Td>
                  <Td className="uppercase ">
                    {product?.isActive ? (
                      <Badge ml="1" colorScheme="green">
                        Active
                      </Badge>
                    ) : (
                      <Badge ml="1" colorScheme="red">
                        Inactive
                      </Badge>
                    )}
                  </Td>
                </Tr>
                <Tr>
                  <Td className="w-[200px]">Mô tả</Td>
                  <Td>
                    <p className="leading-6 text-wrap">
                      {product?.description}
                    </p>
                  </Td>
                </Tr>
                <Tr>
                  <Td className="w-[200px]">Danh mục</Td>
                  <Td>{product?.category.name}</Td>
                </Tr>
                <Tr>
                  <Td className="w-[200px]">Ngày tạo</Td>
                  <Td>{formatDate(product?.createdAt as string)}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>

      <Card className="mt-10">
        <CardHeader className="flex justify-between bg-gray-100">
          <h1 className="text-lg font-bold uppercase">Avatar</h1>
          <Button
            colorScheme="teal"
            variant="outline"
            size="md"
            onClick={onOpenEditAvatar}
          >
            Edit
          </Button>
        </CardHeader>
        <CardBody>
          <div className="border rounded-md">
            <Image srcSet={product?.avatar} width={150} />
          </div>
          <ModalEditAvatar
            isOpen={isOpenEditAvatar}
            onClose={onCloseEditAvatar}
          />
        </CardBody>
      </Card>

      <Card className="mt-10">
        <CardHeader className="flex justify-between bg-gray-100">
          <h1 className="text-lg font-bold uppercase">Hình ảnh sản phẩm</h1>
          <Button
            colorScheme="teal"
            variant="outline"
            size="md"
            onClick={onOpenEditImages}
          >
            Edit
          </Button>
        </CardHeader>
        <CardBody>
          <ModalEditImages
            isOpen={isOpenEditImages}
            onClose={onCloseEditImages}
          />
          <div className="flex gap-4 border rounded-md">
            {product?.images.map((image) => (
              <Image key={image} srcSet={image} width={150} />
            ))}
          </div>
        </CardBody>
      </Card>

      <Card className="my-10">
        <CardHeader className="flex justify-between bg-gray-100">
          <h1 className="text-lg font-bold uppercase">Variations</h1>
          <AddVariationModalButton />
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table variant="simple">
              {product?.variations.length !== 0 ? (
                <Thead>
                  <Tr className="font-semibold">
                    <Td>Kích cỡ</Td>
                    <Td>Số lượng trong kho</Td>
                    <Td>Giá gốc</Td>
                    <Td>Giá bán</Td>
                    <Td></Td>
                  </Tr>
                </Thead>
              ) : (
                <p>Hiện tại chưa có biến thể nào cho sản phẩm này</p>
              )}
              <Tbody>
                {product?.variations.map((variation) => (
                  <Tr key={variation._id}>
                    <Td>{variation.size}</Td>
                    <Td>{variation.availableQuantity}</Td>
                    <Td>{formatMoneyVND(variation.unitPrice)}</Td>
                    <Td>{formatMoneyVND(variation.salePrice)}</Td>
                    <Td className="w-[100px]">
                      <div className="flex gap-2">
                        <UpdateVariationModalButton variationData={variation} />
                        <DeleteVariationModalButton variation={variation} />
                      </div>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </main>
  );
}

export function ProductDetailSkeleton() {
  return (
    <Stack padding={4} spacing={1}>
      <Skeleton className="h-[240px]">
        <Box>Hello World!</Box>
      </Skeleton>
      <Skeleton className="h-[240px]">
        <Box>Hello React!</Box>
      </Skeleton>
      <Skeleton className="h-[240px]">
        <Box>Hello ChakraUI!</Box>
      </Skeleton>
    </Stack>
  );
}

export type ModalEditAvatarType = {
  isOpen: boolean;
  onClose: () => void;
};

export function ModalEditAvatar({ isOpen, onClose }: ModalEditAvatarType) {
  const [updatedAvatar, setUpdatedAvatar] = useState<string>();
  const { id: productId } = useParams();
  const editProductMutation = useEditProduct(productId as string);

  const handleSubmitUpdateAvatar = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const avatarResponseData = await uploadToCloudinary(
      updatedAvatar as string
    );
    editProductMutation.mutate({
      productId: productId as string,
      avatar: avatarResponseData?.data?.url,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmitUpdateAvatar}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cập nhật avatar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl as="fieldset" mt={5}>
              <FormLabel as="legend">Tải lên avatar mới</FormLabel>
              <SingleUpdateAvatar onSetFieldValue={setUpdatedAvatar} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Huỷ
            </Button>
            <Button
              type="submit"
              colorScheme="teal"
              isLoading={editProductMutation.isPending}
              isDisabled={!updatedAvatar}
            >
              Lưu
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
export type ModalEditImagesType = ModalEditAvatarType;
export function ModalEditImages({ isOpen, onClose }: ModalEditImagesType) {
  const [updatedImages, setUpdatedImages] = useState<string[]>();
  const { id: productId } = useParams();
  const editProductMutation = useEditProduct(productId as string);

  const handleSubmitUpdateImages = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const imagesResponseData = await Promise.all(
      (updatedImages as string[]).map((image) => uploadToCloudinary(image))
    );

    const newImages = imagesResponseData.map((image) => image.data.url);

    editProductMutation.mutate({
      productId: productId as string,
      images: newImages,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmitUpdateImages}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cập nhật ảnh sản phẩm</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl as="fieldset" mt={5}>
              <FormLabel as="legend">Tải lên các ảnh mới</FormLabel>
              <MultipleUpdateImages onSetFieldValue={setUpdatedImages} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Huỷ
            </Button>
            <Button
              type="submit"
              colorScheme="teal"
              isLoading={editProductMutation.isPending}
              isDisabled={!updatedImages?.length}
            >
              Lưu
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
