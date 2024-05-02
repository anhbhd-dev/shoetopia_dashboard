import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUpdatePassword } from "../apis/queries/useUpdateUserPassword";

export default function UserProfileEdit(): JSX.Element {
  const { user } = useAuthContext();

  const updatePasswordMutation = useUpdatePassword(user._id);
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Bắt buộc nhập"),
      newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Bắt buộc nhập"),
      confirmPassword: Yup.string()
        .equals([Yup.ref("newPassword")], "Passwords must match")
        .required("Bắt buộc nhập"),
    }),
    onSubmit: (values) => {
      updatePasswordMutation.mutate({
        _id: user?._id,
        password: values.currentPassword,
        newPassword: values.confirmPassword,
      });
      formik.resetForm();
    },
  });

  return (
    <Flex
      className="flex justify-center mt-0"
      align={"center"}
      justify={"center"}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="flex justify-center w-full"
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "2xl", sm: "3xl" }}
            className="mb-10"
          >
            Cập nhật thông tin
          </Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              value={user?.email}
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              isDisabled
              type="email"
            />
          </FormControl>
          <FormControl id="currentPassword" isRequired>
            <FormLabel>Current Password</FormLabel>
            <Input
              placeholder="Current Password"
              _placeholder={{ color: "gray.500" }}
              type="password"
              {...formik.getFieldProps("currentPassword")}
            />
            <FormHelperText color={"red.500"}>
              {formik.errors.currentPassword}
            </FormHelperText>
          </FormControl>
          <FormControl id="newPassword" isRequired>
            <FormLabel>New Password</FormLabel>
            <Input
              placeholder="New Password"
              _placeholder={{ color: "gray.500" }}
              type="password"
              {...formik.getFieldProps("newPassword")}
            />{" "}
            <FormHelperText color={"red.500"}>
              {formik.errors.newPassword}
            </FormHelperText>
          </FormControl>
          <FormControl id="confirmPassword" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              placeholder="Confirm Password"
              _placeholder={{ color: "gray.500" }}
              type="password"
              {...formik.getFieldProps("confirmPassword")}
            />{" "}
            <FormHelperText color={"red.500"}>
              {formik.errors.confirmPassword}
            </FormHelperText>
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button color={"black"} w="full" onClick={() => formik.resetForm()}>
              Reset
            </Button>
            <Button
              type="submit"
              bg={"teal.400"}
              color={"white"}
              w="full"
              _hover={{ bg: "teal.500" }}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
    </Flex>
  );
}
