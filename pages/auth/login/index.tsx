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

const Login = () => {
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
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}></form>

        <Container size={420} my={40}>
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
          >
            Welcome back!
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Do not have an account yet?{" "}
            <Anchor<"a"> href="#" size="sm">
              Create account
            </Anchor>
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
              <Anchor<"a">
                onClick={(event) => event.preventDefault()}
                href="#"
                size="sm"
              >
                Forgot password?
              </Anchor>
            </Group>
            <Button fullWidth mt="xl">
              Sign in
            </Button>
          </Paper>
        </Container>
      </AuthLayout>
    </MantineProvider>
  );
};

export default Login;
