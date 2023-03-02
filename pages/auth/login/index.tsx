import {
  Container,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Anchor,
  Checkbox,
  Group,
  Text,
  Paper,
  Title,
  MantineProvider,
} from "@mantine/core";
import AuthLayout from "@/Layouts/AuthLayout";
import { useForm } from "@mantine/form";
import { useTheme } from "@/hooks";
import { endpoints } from "@/constants";
import Link from "next/link";

const Login = () => {
  const { colors } = useTheme();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: typeof form.values) => {};

  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <AuthLayout>
        <form
          autoComplete={"off"}
          onSubmit={form.onSubmit((values) => handleSubmit(values))}
          style={{
            color: colors.landingPage.text.header,
          }}
        ></form>

        <Container size={450} my={40}>
          <Title align="center" color={colors.landingPage.text.header}>
            Welcome back!
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Do not have an account yet?{" "}
            <Text
              component={Link}
              href={endpoints.client.signup}
              variant="link"
            >
              Create account
            </Text>
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput label="Email" placeholder="you@mantine.dev" required />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
            />
            <Group position="apart" mt="lg">
              <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
              <Text
                component={Link}
                href={endpoints.client.signup}
                variant="link"
                size="sm"
              >
                Forgot password
              </Text>
            </Group>
            <Button fullWidth mt="xl">
              Login
            </Button>
          </Paper>
        </Container>
      </AuthLayout>
    </MantineProvider>
  );
};

export default Login;
