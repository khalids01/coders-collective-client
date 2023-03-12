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
  LoadingOverlay,
} from "@mantine/core";
import AuthLayout from "@/Layouts/AuthLayout";
import { useForm, zodResolver } from "@mantine/form";
import { useAuth, useTheme } from "@/hooks";
import Link from "next/link";
import { endpoints } from "@/constants";
import z from "zod";

const SignUp = () => {
  const { colors } = useTheme();
  const { credentialSignup, signupLoading } = useAuth();

  const schema = z.object({
    first_name: z
      .string()
      .min(3, { message: "First name must be 3 or more character" })
      .max(15, { message: "First name cannot be more then 15 characters" }),
    last_name: z
      .string()
      .min(2, { message: "Last name must be 2 or more character" })
      .max(10, { message: "Last name cannot be more then 10 characters" }),
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
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = (values: typeof form.values) => {
    credentialSignup(values);
  };

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

            <Paper
              withBorder
              shadow="md"
              p={30}
              mt={30}
              radius="md"
              bg={colors.background.paper}
              pos="relative"
            >
              <LoadingOverlay visible={signupLoading} />
              <TextInput
                {...form.getInputProps("first_name")}
                label="First Name"
                placeholder="First Name"
                required
                classNames={
                  {input: 'bg-default'}
                }
              />
              <TextInput
                mt="md"
                {...form.getInputProps("last_name")}
                label="Last Name"
                placeholder="Last Name"
                required
                classNames={
                  {input: 'bg-default'}
                }
              />

              <TextInput
                label="Email"
                placeholder="your.email@domain.com"
                required
                type={"email"}
                mt="md"
                {...form.getInputProps("email")}
                classNames={
                  {input: 'bg-default'}
                }
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                mt="md"
                {...form.getInputProps("password")}
                classNames={
                  {input: 'bg-default'}
                }
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
              <Button type="submit" fullWidth mt="xl">
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
