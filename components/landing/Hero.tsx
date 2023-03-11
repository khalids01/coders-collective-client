import {
  Title,
  Text,
  Stack,
  Button,
  Container,
  createStyles,
} from "@mantine/core";
import { useBreakPoints, useTheme } from "@/hooks";
import basicInfo from "@/constants/basicInfo";
import Link from "next/link";
import { endpoints } from "@/constants";

const useStyles = createStyles((theme) => {
  return {
    join: {
      fontSize: 18,
      display: "grid",
      placeContent: "center",
      fontWeight: 700,
      background:
        "linear-gradient(to right, #dd098c, #53f1b0, #6ca5fb, #cb54fe)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      transition: "all 0.3s",
      boxShadow:
        "0px 2px 5px 0px #dd098c, 0px 1px 5px 0px #53f1b0, 0px 1px 6px 0px #6ca5fb, 0px 1px 10px 0px #cb54fe",
      "&:hover": {
        boxShadow:
          "0px 2px 6px 0px #dd09d2, 0px 1px 6px 0px #53f1f1, 0px 1px 7px 0px #6c89fb, 0px 1px 12px 0px #fe45fb",
        background:
          "linear-gradient(to right, #f92fab, #75feca, #78bbff, #dc5ffe)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      },

      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
        fontSize: 14,
      },
    },
  };
});

const Hero = () => {
  const { sm, md, lg, xl } = useBreakPoints();
  const { colors } = useTheme();

  const { classes } = useStyles();

  return (
    <section>
      <Container size="xl" px={20} py={lg ? 40 : 80} mt={'6%'}>
        <Stack align="center" spacing={sm ? 20 : 24} pb={sm ? 20 : 40}>
          <Title
            color={colors.landingPage.text.header}
            size={sm ? 36 : md ? 46 : xl ?  60 : 70}
            align="center"
            weight={700}
            order={1}
          >
            {process.env.NEXT_PUBLIC_NAME}
          </Title>
          <Text
            color={colors.landingPage.text.textDisabled}
            size={sm ? 14 : lg ? 18 : 20}
            mt={-10}
            align="center"
            sx={{
              maxWidth: sm ? 300 : md ? 350 : 450,
              marginInline: "auto",
            }}
          >
            {basicInfo.subHeadline}
          </Text>
          <Button
            variant="outline"
            component={Link}
            href={endpoints.client.signup}
            className={classes.join}
          >
            Join community
          </Button>
        </Stack>
      </Container>
    </section>
  );
};

export default Hero;
