import CustomNavbar from "@/components/mainLayout/Navbar";
import { Navbar, AppShell } from "@mantine/core";

const MainLayout = ({ children }: { children: any }) => {
  return (
    <AppShell
      navbar={
        <Navbar>
          <CustomNavbar />
        </Navbar>
      }
    >
      {children}
    </AppShell>
  );
};

export default MainLayout;
