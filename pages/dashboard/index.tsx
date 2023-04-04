import MainLayout from "@/Layouts/MainLayout";
import { useBreakPoints, useTheme } from "@/hooks";
import {
  createStyles,
  SimpleGrid,
  Skeleton,
  Stack,
  px,
  useMantineTheme,
  ScrollArea,
} from "@mantine/core";
import { ColorsType } from "@/hooks/useTheme";

const useStyle = createStyles((theme, colors: ColorsType) => ({
  container: {
    backgroundColor: colors.background.neutral,
    padding: "2rem 1.5rem",
    [theme.fn.smallerThan("md")]: {
      padding: "1.5rem 1rem",
    },
  },
}));

const getChild = (height: number) => (
  <Skeleton height={height} radius="md" animate={false} />
);
const BASE_HEIGHT = 360;
const getSubHeight = (children: number, spacing: number) =>
  BASE_HEIGHT / children - spacing * ((children - 1) / children);

const Chat = () => {
  const { md } = useBreakPoints();
  const { colors } = useTheme();
  const { classes } = useStyle(colors);
  const theme = useMantineTheme();
  return (
    <MainLayout>
      <section className={classes.container}>
        <ScrollArea>
            <SimpleGrid cols={4} breakpoints={[{ maxWidth: "xs", cols: 1 }]}>
              {getChild(BASE_HEIGHT)}
              <Stack>
                {getChild(getSubHeight(2, px(theme.spacing.md)))}
                {getChild(getSubHeight(2, px(theme.spacing.md)))}
              </Stack>
              <Stack>
                {getChild(getSubHeight(3, px(theme.spacing.md)))}
                {getChild(getSubHeight(3, px(theme.spacing.md)))}
                {getChild(getSubHeight(3, px(theme.spacing.md)))}
              </Stack>
              {getChild(BASE_HEIGHT)}
            </SimpleGrid>
        </ScrollArea>
      </section>
    </MainLayout>
  );
};

export default Chat;
