import {
  Avatar,
  Box,
  BoxProps,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactText } from "react";
import { IconType } from "react-icons";
import { BiCategory } from "react-icons/bi";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import { GiConverseShoe } from "react-icons/gi";
import { MdOutlinePayments } from "react-icons/md";
import { PiPackageDuotone } from "react-icons/pi";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

interface LinkItemProps {
  name: string;
  icon: IconType;
  linkTo: string;
}
export const LinkItems: Array<LinkItemProps> = [
  { name: "Quản lý danh mục", linkTo: "categories", icon: BiCategory },
  { name: "Quản lý sản phẩm", linkTo: "products", icon: GiConverseShoe },
  { name: "Quản lý đơn hàng", linkTo: "orders", icon: PiPackageDuotone },
  {
    name: "Phương thức thanh toán",
    linkTo: "payment-methods",
    icon: MdOutlinePayments,
  },
];

export default function SidebarWithHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("gray.100", "gray.900");

  return (
    <Box minH="100vh" bg={bgColor} className="!bg-white">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet />
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <div className="flex flex-col items-center">
          <Text
            fontSize="2xl"
            fontFamily="monospace"
            className="!font-extrabold uppercase"
          >
            Shoetopia
          </Text>
          <Text
            fontSize="small"
            fontFamily="monospace"
            className="!font-extrabold"
          >
            Dashboard
          </Text>
        </div>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} linkTo={link.linkTo}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  linkTo: string;
}
export const NavItem = ({ icon, linkTo, children, ...rest }: NavItemProps) => {
  const { pathname } = useLocation();
  const isActive = pathname.includes(linkTo);
  return (
    <Link to={linkTo}>
      <div style={{ textDecoration: "none" }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          bg={isActive ? "teal.500" : "unset"}
          color={isActive ? "white" : "black"}
          {...rest}
        >
          {icon && <Icon mr="4" fontSize="16" as={icon} />}
          {children}
        </Flex>
      </div>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { logout, user } = useAuthContext();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        className="!font-extrabold uppercase"
      >
        Shoetopia
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={"/images/default-avatar.jpg"} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{`${user?.firstName} ${user?.lastName}`}</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <Link to="profile">
                <MenuItem>Profile</MenuItem>
              </Link>
              <MenuDivider />
              <MenuItem onClick={logout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
