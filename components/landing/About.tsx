import {
  createStyles,
  Stack,
  Group,
  Text,
  Title,
  Container,
  List,
} from "@mantine/core";
import { IconActivity } from "@tabler/icons";

const useStyles = createStyles(() => ({}));

const About = () => {
  const { classes } = useStyles();
  return (
    <section>
      <Container size='lg'>
        <Title variant="gradient" order={3}>
          About.
        </Title>
        <Text>
          A place where programmers and developers can find and explore about
          useful and new tools. 
        </Text>

        <List icon={<IconActivity/>}>
          <List.Item>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi,
            accusantium!
          </List.Item>
          <List.Item>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi,
            accusantium!
          </List.Item>
          <List.Item>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi,
            accusantium!
          </List.Item>
        </List>
      </Container>
    </section>
  );
};


export default About;