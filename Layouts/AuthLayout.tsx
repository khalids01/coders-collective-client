import { ReactElement } from "react";
import { Container, Group } from "@mantine/core";
import { useTheme } from "@/hooks";
import { Logo } from "@/components/common/sub";

export default function AuthLayout({ children }: { children: any }) {
  const { colors } = useTheme();
  return (
    <main
      style={{
        backgroundColor: colors.landingPage.background.header,
        height: "100%",
        width: "100%",
      }}
    >
      <header>
        <Logo />
      </header>
      <Container size="md">{children}</Container>
    </main>
  );
}
