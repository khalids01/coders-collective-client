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
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = (values: typeof form.values) => {
    
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
              Admin Login
            </Title>
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
              <Button type="submit" fullWidth mt="xl">
                Login
              </Button>
            </Paper>
          </Container>
        </form>
      </AuthLayout>
    </MantineProvider>
  );
};

export default Login;
