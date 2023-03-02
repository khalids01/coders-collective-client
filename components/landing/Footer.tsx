import { Container, Grid, Stack, Text } from "@mantine/core";
import { useTheme } from "@/hooks";

const Footer = () => {
  const { colors } = useTheme();

  return (
    <footer style={{ background: "var(--lightest)" }}>
      <Container size="xl" px={20} py={70}>
        <Grid>
          <Grid.Col span={6} md={4}>
            <Stack>
              {[
                "privacy-policy",
                "terms-and-condition",
                "community",
                "chat",
              ].map((item, index) => (
                <Text
                  key={index}
                  color={colors.landingPage.text.footer}
                  size={16}
                  weight={500}
                  transform="capitalize"
                >
                  {item.replaceAll("-", " ")}
                </Text>
              ))}
            </Stack>
          </Grid.Col>
          <Grid.Col span={6} md={4}>
            <Stack>
              {[
                "privacy-policy",
                "terms-and-condition",
                "community",
                "chat",
              ].map((item, index) => (
                <Text
                  key={index}
                  color={colors.landingPage.text.footer}
                  size={16}
                  weight={500}
                  transform="capitalize"
                >
                  {item.replaceAll("-", " ")}
                </Text>
              ))}
            </Stack>
          </Grid.Col>
          <Grid.Col span={6} md={4}>
            <Stack>
              {[
                "privacy-policy",
                "terms-and-condition",
                "community",
                "chat",
              ].map((item, index) => (
                <Text
                  key={index}
                  color={colors.landingPage.text.footer}
                  size={16}
                  weight={500}
                  transform="capitalize"
                >
                  {item.replaceAll("-", " ")}
                </Text>
              ))}
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
