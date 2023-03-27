import {
  Container,
  TextInput,
  PasswordInput,
  Button,
  Checkbox,
  Group,
  Text,
  Paper,
  Title,
  MantineProvider,
  LoadingOverlay,
} from "@mantine/core";
import AuthLayout from "@/Layouts/AuthLayout";
import { useForm, zodResolver } from "@mantine/form";
import { useTheme } from "@/hooks";
import { endpoints } from "@/constants";
import Link from "next/link";
import { useAuth } from "@/hooks";
import z from "zod";

const Login = () => {
  const { colors } = useTheme();
  const { credentialLogin, loginLoading } = useAuth();

  const schema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(8, { message: "Password must be 8 or more characters" })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
        message: "Password must contain at least one letter and one number",
      })
      .max(20, { message: "Password cannot be more then 20 characters" }),
  });

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = (values: typeof form.values) => {
    credentialLogin(values);
  };

  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <AuthLayout>
        <form
          autoComplete={"off"}
          onSubmit={form.onSubmit((values) => handleSubmit(values))}
          style={{
            color: colors.landingPage.text.header,
          }}
        >
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

            <Paper
              withBorder
              shadow="md"
              p={30}
              mt={30}
              radius="md"
              pos={"relative"}
              bg={colors.background.paper}
            >
              <LoadingOverlay visible={loginLoading} />
              <TextInput
                classNames={{ input: "bg-default" }}
                label="Email"
                placeholder="you@mantine.dev"
                required
                {...form.getInputProps("email")}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                mt="md"
                classNames={{ input: "bg-default" }}
                {...form.getInputProps("password")}
              />
              <Group position="apart" mt="lg">
                <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
                <Text
                  component={Link}
                  href={endpoints.client.forget_password}
                  size="sm"
                  variant="link"
                  color="var(--blue)"
                >
                  Forgot password
                </Text>
              </Group>
              <Button type="submit" fullWidth mt="xl">
                Login
              </Button>

              <Group position="right" mt={20}>
                <Text
                  component={Link}
                  href={endpoints.client.signup}
                  variant="link"
                  size="sm"
                >
                  {"Don't"} have an account yet?
                  <Text
                    ml={8}
                    variant="link"
                    color="var(--blue)"
                    inline
                    component={Link}
                    href={endpoints.client.signup}
                  >
                    Sign Up
                  </Text>
                </Text>
              </Group>
            </Paper>
          </Container>
        </form>
      </AuthLayout>
    </MantineProvider>
  );
};

export default Login;
