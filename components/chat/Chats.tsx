import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Text,
  TextInput,
  Group,
  Stack,
  UnstyledButton,
  ActionIcon,
  Tooltip,
  Avatar,
  Skeleton,
  Box,
  Button,
  Divider,
  ScrollArea,
  Badge,
  useMantineTheme,
} from "@mantine/core";
import { motion } from "framer-motion";
import { useElementSize } from "@mantine/hooks";
import { useBreakPoints, useLayout, useTheme, useUser } from "@/hooks";

import { CircleDashed, Search, Filter, Code } from "@/constants/icons";
import { CompactText } from "@/components/common/sub";
import { Div } from "@/components/common/sub";

import withHydration from "@/HOC/withHydration";

interface Chat {
  avatar: string;
  lastMessage: string;
  time: string;
  name: string;
}

const ChatItem = ({
  active = false,
  chat,
}: {
  active?: boolean;
  chat: Chat;
}) => {
  const { colors } = useTheme();
  const { md } = useBreakPoints();

  return (
    <Box
      mx={4}
      sx={{
        backgroundColor: active ? colors.card.active : colors.background.paper,
        padding: "16px 25px 16px 16px",
        display: "grid",
        gridTemplateColumns: "60px auto",
        alignItems: "center",
        cursor: "pointer",
        boxShadow: `0 0 12px ${colors.shadows.default}`,
        borderRadius: 8,
        // border: `1px solid ${active ? colors.teal : "transparent"}`,
        transition: "all 0.3s",
        "&:hover": {
          scale: "101%",
          boxShadow: `0 0 20px ${colors.shadows.default}`,
        },
      }}
    >
      <Avatar radius={100}>
        <img
          src={"/images/k.png"}
          alt={"user"}
          width={40}
          height={40}
          className="object-cover transition-all duration-300 object-top"
        />
      </Avatar>
      <Stack align={"stretch"} spacing={4}>
        <Group position="apart">
          <Text weight={600}>
            <CompactText
              color={active ? "white" : undefined}
              text={chat.name}
              length={md ? 6 : 10}
            />
          </Text>
          <Text color={active ? "white" : colors.text.primary} size={12}>
            9:36
          </Text>
        </Group>
        <Group position="apart">
          <Text size={14}>
            <CompactText
              color={active ? "white" : undefined}
              text={chat.lastMessage}
              length={md ? 6 : 10}
            />
          </Text>
          <Badge
            py={5}
            px={6}
            bg={active ? "white" : colors.background.default}
          >
            {Math.floor(Math.random() * 5) + 1}
          </Badge>
        </Group>
      </Stack>
    </Box>
  );
};

const Chats = () => {
  const mantineTheme = useMantineTheme();
  const { chatLayout } = useLayout();
  const { colors } = useTheme();
  const { user } = useUser();
  const { ref, height } = useElementSize();
  const [scrollHeight, setScrollHeight] = useState(200);
  const { ref: first, height: firstHeight } = useElementSize();

  useEffect(() => {
    if (!height || !firstHeight) return;

    setScrollHeight(height - firstHeight);
  }, [firstHeight]);
  return (
    <Stack
      ref={ref}
      spacing={0}
      align="stretch"
      className="relative h-full shadow-md"
      sx={{
        borderRight: `1px solid ${colors.divider}`,
        width: "100%",
        height: "100%",
        maxHeight: "100vh",
        overflow: "hidden",
        maxWidth: 400,
        backgroundColor: colors.background.default,
      }}
    >
      <Box
        ref={first}
        pt={28}
        px={16}
        // sx={{ boxShadow: `0 0 16px ${colors.background.paper}` }}
      >
        <Group position="apart" align={"center"}>
          <Text weight={700} size={28} color={colors.text.primary}>
            Chats
          </Text>
          <UnstyledButton pt={8}>
            {user?.is_active ? (
              <Div
                mb={10}
                h={15}
                w={15}
                rounded={30}
                bg={mantineTheme.colors.green[5]}
              />
            ) : (
              <CircleDashed size={24} />
            )}
          </UnstyledButton>
        </Group>

        <Box my={20}>
          <TextInput
            placeholder="Search"
            icon={<Search size={22} />}
            iconWidth={50}
            rightSection={
              <ActionIcon>
                <Filter size={22} />
              </ActionIcon>
            }
            radius={20}
            styles={{
              input: {
                background: colors.background.default,
                height: 45,
                paddingLeft: 30,
              },
              rightSection: {
                width: 60,
              },
              icon: {
                width: 60,
                display: "grid",
                placeItems: "center",
              },
            }}
          />
        </Box>

        {/* <Group>
          <Button variant="subtle">
            <Text inline color={colors.text.secondary}>
              <Archive size={24} />
            </Text>
            <Text ml={10} size={15} weight={500}>
              Archived
            </Text>
          </Button>
        </Group> */}
        <Divider color={colors.divider} mt={16} />
      </Box>
      <ScrollArea
        // maxHeight={scrollHeight}
        offsetScrollbars
        pl={16}
        pr={4}
        style={{
          maxHeight: scrollHeight,
        }}
      >
        <Text
          mb={16}
          mt={16}
          pl={4}
          color={colors.blue}
          sx={{ textShadow: `0 0 2px ${colors.teal}` }}
        >
          Pinned
        </Text>
        <Stack spacing={18}>
          {Array.from({ length: 10 }, (_, i) => (
            <ChatItem
              chat={{
                avatar: "/images/k.png",
                lastMessage: "lorem ipsum dolor",
                time: "8:20",
                name: "Khalid Khan",
              }}
              active={i === 1}
              key={i}
            />
          ))}
          <Divider
            mb="xs"
            label={<Text color={colors.text.secondary}>End</Text>}
            labelPosition="center"
            sx={{
              "&::after, &::before": {
                borderColor: colors.text.secondary,
              },
            }}
          />
        </Stack>
      </ScrollArea>
    </Stack>
  );
};

export default withHydration(Chats);
