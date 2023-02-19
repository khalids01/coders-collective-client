import { Text, Button, Box, Group, Drawer } from "@mantine/core";
import { useToken } from "@/hooks";

const Header = () => {
  const { isLoggedIn } = useToken();
  return <div>Header</div>;
};

export default Header;
