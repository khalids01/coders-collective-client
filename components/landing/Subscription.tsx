import { Button, Container, Group, TextInput } from "@mantine/core";
const Subscription = () => {
  return (
    <section style={{ background: "var(--navy)" }}>
      <Container size="xl" px={20} py={80}>
        <form>
          <Group position="center">
            <TextInput
              styles={{
                input: {
                  color: "white",
                  background: "var(--darkest)",
                },
              }}
              size="md"
              placeholder="Enter your email"
            />
            <Button color="indigo" variant="filled">
              Subscribe
            </Button>
          </Group>
        </form>
      </Container>
    </section>
  );
};

export default Subscription;
