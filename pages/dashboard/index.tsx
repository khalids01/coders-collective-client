import MainLayout from "@/Layouts/MainLayout";
import { useBreakPoints, useTheme } from "@/hooks";
import {
  createStyles,
  Skeleton,
  Stack,
  useMantineTheme,
  ScrollArea,
  Box,
  rem,
  Title,
  Group,
  Text,
} from "@mantine/core";
import { ColorsType } from "@/hooks/useTheme";
import { ProfileView } from "@/constants/icons";

const useStyle = createStyles((theme, colors: ColorsType) => ({
  container: {
    backgroundColor: colors.background.neutral,
    padding: "2rem 1.5rem",
    [theme.fn.smallerThan("md")]: {
      padding: "1.5rem 1rem",
    },
  },
}));

const Chat = () => {
  const { md } = useBreakPoints();
  const { colors } = useTheme();
  const { classes } = useStyle(colors);
  const theme = useMantineTheme();
  
  return (
    <MainLayout>
      <section className={classes.container}>
        <ScrollArea>
          <Group>
            <Stack>
              <Box
                bg={theme.colors.violet[4]}
                px={rem(24)}
                py={rem(20)}
                sx={{
                  color: "white",
                  borderRadius: 12,
                }}
              >
                <Group>
                  <ProfileView size={30} />
                  <Title size={24}>Profile Views</Title>
                </Group>
                <Text ml={40} size={24} weight={600}>
                  0
                </Text>
              </Box>
            </Stack>
            <Stack></Stack>
          </Group>
        </ScrollArea>
      </section>
    </MainLayout>
  );
};

export default Chat;

// Bounties,
//  Profile View, Posts
