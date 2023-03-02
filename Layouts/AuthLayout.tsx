import { Container, Text, Group } from "@mantine/core";
import { useTheme } from "@/hooks";
import { Logo } from "@/components/common/sub";
import Link from "next/link";

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
        <Container size="xl" px={20} py={20}>
          <Group position="left">
            <Logo />
            {/* <Text
              component={Link}
              href="/"
              color={colors.landingPage.text.header}
              size={28}
              weight={600}
            >
              {process.env.NEXT_PUBLIC_NAME}
            </Text> */}
          </Group>
        </Container>
      </header>
      <Container size="md">{children}</Container>
    </main>
  );
}
