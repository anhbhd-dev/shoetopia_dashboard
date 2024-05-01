import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  UserLoginFormType,
  fetchUserProfile,
  login,
} from "../apis/user.services";
import { UserData } from "../contexts/auth-context";
import { useAuthContext } from "../hooks/useAuthContext";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: Yup.string()
    .min(8, "Mật khẩu ít nhất 8 ký tự")
    .required("Mật khẩu là bắt buộc"),
});

export type LoginSuccessResponse = {
  accessToken: string;
  refreshToken: string;
};

export default function LoginForm() {
  const { setUser, user } = useAuthContext();
  const [isLoggedInChecking, setIsLoggedInChecking] = useState<boolean>(true);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (user.isAuthenticated) navigate("/admin/categories");
    setIsLoggedInChecking(false);
  }, [user, navigate]);

  if (isLoggedInChecking) return null;

  const handleSubmit = async (values: UserLoginFormType, actions) => {
    try {
      const loginRes: LoginSuccessResponse = await login(values);

      if (loginRes) {
        // TODO: Save accessToken to localStorage
        localStorage.setItem("adminAccessToken", loginRes.accessToken);
        localStorage.setItem("adminRefreshToken", loginRes.refreshToken);
        const userDataResponse = await fetchUserProfile();

        setUser({
          isAuthenticated: true,
          ...userDataResponse,
        } as UserData);

        toast({
          title: "Thành công",
          description: "Đăng nhập thành công",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/admin");
      }
    } catch (err) {
      if ((err as AxiosError).response?.status === 404) {
        return toast({
          title: "Email không hợp lệ",
          description: `Người dùng với email ${values.email} không tồn tại`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }

      if (
        (err as AxiosError).response?.status === 401 &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((err as AxiosError).response?.data as any).message ===
          "Password incorrect"
      ) {
        return toast({
          title: "Email hoặc mật khẩu không đúng",
          description: `Xin đăng nhập lại`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }

      return toast({
        title: "Đã có lỗi xảy ra",
        description: err.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }

    actions.setSubmitting(false);
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading className="uppercase" fontSize={"4xl"}>
            Sign in to your admin account
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Shoetopia Dashboard
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form>
                <Field name="email">
                  {({ field }) => (
                    <FormControl id="email" className="mb-4">
                      <FormLabel>Email address</FormLabel>
                      <Input {...field} type="email" />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </FormControl>
                  )}
                </Field>
                <Field name="password">
                  {({ field }) => (
                    <FormControl id="password" className="mb-4">
                      <FormLabel>Password</FormLabel>
                      <Input {...field} type="password" />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </FormControl>
                  )}
                </Field>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Link color={"teal.400"}>Forgot password?</Link>
                  </Stack>
                  <Button
                    type="submit"
                    bg={"teal.400"}
                    color={"white"}
                    _hover={{
                      bg: "teal.500",
                    }}
                    isLoading={formik.isSubmitting}
                  >
                    Sign in
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
}
