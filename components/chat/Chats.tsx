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
  Center,
} from "@mantine/core";
import { motion } from "framer-motion";
import { useElementSize } from "@mantine/hooks";
import { useBreakPoints, useTheme, useUser, useChat } from "@/hooks";

import { CircleDashed, Search, Filter, Code } from "@/constants/icons";
import { CompactText, ProfileImage } from "@/components/common/sub";
import { Div } from "@/components/common/sub";
import Friend from "@/types/friend";
import { useRouter } from "next/router";
import { endpoints } from "@/constants";

const ChatItem = ({ friend }: { friend: Friend }) => {
  const { colors } = useTheme();
  const { md } = useBreakPoints();
  const router = useRouter();
  const { id } = router.query;

  const handleChatItemClick = () => {
    router.push(`${endpoints.client.chat}/${friend._id}`);
  };

  return (
    <UnstyledButton
      mx={4}
      onClick={handleChatItemClick}
      sx={{
        backgroundColor:
          id === friend._id ? colors.card.focus : colors.background.paper,
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
      <ProfileImage
        first_name={friend.first_name}
        last_name={friend.last_name}
        avatar={friend.avatar}
      />
      <Stack align={"stretch"} spacing={4}>
        <Group position="apart">
          <Text weight={600}>
            <CompactText
              color={id === friend._id ? "white" : undefined}
              text={`${friend.first_name} ${friend.last_name}`}
              length={md ? 6 : 10}
            />
          </Text>
          <Text
            color={id === friend._id ? "white" : colors.text.primary}
            size={12}
          >
            9:36
          </Text>
        </Group>
        <Group position="apart">
          <Text size={14}>
            <CompactText
              color={id === friend._id ? "white" : undefined}
              text={"Last message"}
              length={md ? 6 : 10}
            />
          </Text>
          <Badge
            py={5}
            px={6}
            bg={
              id === friend._id ? "var(--badgeBg)" : colors.background.default
            }
            sx={{
              color: id === friend._id ? "black" : "var(--blue)",
            }}
          >
            {Math.floor(Math.random() * 5) + 1}
          </Badge>
        </Group>
      </Stack>
    </UnstyledButton>
  );
};

const Chats = () => {
  const mantineTheme = useMantineTheme();
  const { md } = useBreakPoints();
  const { colors } = useTheme();
  const { user } = useUser();
  const { ref, height } = useElementSize();
  const [scrollHeight, setScrollHeight] = useState(200);
  const { ref: first, height: firstHeight } = useElementSize();
  const { friends } = useChat();

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
        maxWidth: md ? "auto" : 400,
        backgroundColor: colors.background.default,
      }}
    >
      <Box ref={first} pt={md ? 10 : 16} px={16}>
        <Group position="apart" align={"center"}>
          <Text weight={700} size={26} color={colors.text.primary}>
            Chats
          </Text>
          <UnstyledButton pt={8}>
            {user?.active ? (
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

        <Divider color={colors.divider} mt={16} />
      </Box>
      <ScrollArea.Autosize
        mah={md ? scrollHeight : scrollHeight - 20}
        offsetScrollbars
        pl={16}
        pr={4}
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
          {friends ? (
            Object.values(friends)?.map((friend, index) => (
              <ChatItem key={index} friend={friend} />
            ))
          ) : (
            <Center py={40}>
              <Text>No Friends to show</Text>
            </Center>
          )}
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
      </ScrollArea.Autosize>
    </Stack>
  );
};

export default Chats;
