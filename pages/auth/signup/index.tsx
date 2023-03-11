import {
  Container,
  TextInput,
  PasswordInput,
  Button,
  Group,
  Text,
  Paper,
  Title,
  MantineProvider,
} from "@mantine/core";
import AuthLayout from "@/Layouts/AuthLayout";
import { useForm } from "@mantine/form";
import { useTheme } from "@/hooks";
import Link from "next/link";
import { endpoints } from "@/constants";


const SignUp = () => {
  const { colors } = useTheme();

  const form = useForm({
    initialValues: {
      name: "",
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
        >
          <Container size={450} my={40}>
            <Title align="center" color={colors.landingPage.text.header}>
              Join our community!
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md" bg={colors.background.paper}>
              <TextInput label="Name" placeholder="Full Name" required />
              <TextInput
                label="Email"
                color={'red'}
                placeholder="you@mantine.dev"
                required
                mt="md"
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                mt="md"
              />
              <Group position="right" mt="lg">
                <Text color="dimmed" size="sm" align="center" mt={5}>
                  Already have an account?{" "}
                  <Text
                    component={Link}
                    href={endpoints.client.login}
                    variant="link"
                  >
                    Login
                  </Text>
                </Text>
              </Group>
              <Button fullWidth mt="xl">
                Sign up
              </Button>
            </Paper>
          </Container>
        </form>
      </AuthLayout>
    </MantineProvider>
  );
};

export default SignUp;
