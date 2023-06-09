"use-client";
import {
  Text,
  ActionIcon,
  Group,
  Stack,
  Center,
  Button,
  Box,
  Container,
  Badge,
  Drawer,
  Burger,
  createStyles,
} from "@mantine/core";
import { useRouter } from "next/router";
import {
  Video,
  Close,
  MicOn,
  MicOff,
  VideoOff,
  Left,
  Info,
} from "@/constants/icons";
import { useSockets } from "@/context/socket.context";
import { useCallback, useEffect, useState } from "react";
import { EVENTS } from "@/constants/socketConfig";
import MainLayout from "@/Layouts/MainLayout";
import ChatLayout from "@/Layouts/ChatLayout";
import ReactPlayer from "react-player";
import { useBreakPoints, useChat, useUser } from "@/hooks";
import { useTheme } from "@/hooks";
import { ProfileImage } from "@/components/common/sub";
import Link from "next/link";
import { endpoints } from "@/constants";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import ChatInfo from "@/components/chat/info";
import {
  showChatInfo,
  showMainNavDrawer,
} from "@/redux/slices/chatLayoutProps";
import { RootState } from "@/redux/store";
import { MobileNavbarDrawer } from "@/components/mainLayout/nav";
import { motion } from "framer-motion";
import { notifications } from "@mantine/notifications";
import Media from "@/utils/Media";

const useStyles = createStyles(() => ({
  circle: {
    position: "absolute",
    left: "50%",
    top: "50%",
    borderRadius: 9999,
    background: "rgba(58, 108, 146, 0.521)",
    translateX: "-50%",
    translateY: "-50%",
  },
}));

const Content = ({ showAnimation }: { showAnimation: boolean }) => {
  const { classes } = useStyles();
  const { socket, activeFriends, setOpenCallDialog, peerService } =
    useSockets();
  const [myStream, setMyStream] = useState<MediaStream>();
  const [remoteStream, setRemoteStream] = useState<any>(null);
  const [videoOn, setVideoOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);
  const { colors } = useTheme();
  const { user } = useUser();
  const router = useRouter();
  const { chatData } = useChat({ chat_name: router.query?.room as string });
  const { md, xs } = useBreakPoints();
  const dispatch = useDispatch();

  const { showInfo } = useSelector(
    (state: RootState) => state.chatLayout.chatInfo
  );
  const { show: showDrawer } = useSelector(
    (state: RootState) => state.chatLayout.mainNavDrawer
  );

  // const sendStreams = () => {
  //   for (const track of myStream.getTracks()) {
  //     // @ts-ignore
  //     peerService?.peer.addTrack(track, myStream);
  //   }
  // }

  // when I'm calling and user from other side accepts
  const handleAcceptedCall = useCallback(
    async ({
      from,
      to,
      answer,
    }: {
      from: string;
      to: string;
      answer: RTCSessionDescriptionInit;
    }) => {
      if (!myStream) {
        console.log("Stream is not available ");
        return;
      }
      for (const track of myStream?.getTracks()) {
        // @ts-ignore
        peerService?.peer.addTrack(track, myStream);
      }
    },
    [myStream]
  );

  const handleCallEnd = () => {
    // when i end the call
    socket.emit(EVENTS.CLIENT.END_CALL, {
      from: user?.username,
      to: router.query?.room,
    });
    turnOffAll();
    router.push(`${endpoints.client.chat}/${router.query?.room}`);
  };

  // when user from other side end the call
  const onEndCall = useCallback(({ from }: { from: string }) => {
    if (router.query["room-name"] !== user?.username) {
      notifications.show({
        id: "user-leaved-call",
        title: `${from} Leaved`,
        message: `${from} has leaved the call in room ${router.query["room-name"]}`,
        color: "orange",
      });
    }
    router.push(`${endpoints.client.chat}/${router.query?.room}`);
  }, []);

  const handleNegoNeeded = useCallback(async (ng: any) => {
    console.log({ ng });
    // @ts-ignore
    const offer = await peerService?.getOffer();
    socket.emit(EVENTS.CLIENT.PEER_NEGOTIATION_NEEDED, {
      offer,
      to: router.query.room,
      from: user?.username,
    });
  }, []);

  const handleNegoNeededIncoming = useCallback(async ({ from, offer }: any) => {
    // @ts-ignore
    const ans = await peerService.getAnswer(offer);
    socket.emit(EVENTS.CLIENT.PEER_NEGOTIATION_DONE, { to: from, ans });
  }, []);

  const handleNegoFinal = useCallback(async ({ ans }: any) => {
    // @ts-ignore
    await peerService.setLocalDescription(ans);
  }, []);

  function turnOffAll() {
    console.log("off", myStream?.getVideoTracks());
    myStream?.getTracks()?.forEach((track) => {
      track.stop();
    });
  }

  const toggleCamera = () => {
    if (videoOn && myStream?.getVideoTracks()) {
      setVideoOn(false);
      myStream?.getVideoTracks().forEach((track) => {
        track.stop();
      });
    } else {
      setVideoOn(true);
    }
  };

  const toggleMic = () => {
    if (audioOn && myStream?.getAudioTracks()) {
      setAudioOn(false);
      myStream?.getAudioTracks().forEach((track) => {
        track.stop();
      });
    } else {
      setAudioOn(true);
    }
  };

  useEffect(() => {
    let media: Media | undefined;

    const initializeMediaStream = async () => {
      media = new Media(videoOn);
      await media.cameraOn(); // Start with the camera enabled
      setMyStream(media.getStream());
    };

    initializeMediaStream();

    return () => {
      media?.turnOffAll();
    };
  }, []);

  // useEffect(() => {
  // console.log(myStream);
  // }, [myStream]);

  useEffect(() => {
    if (router.query?.room === user?.username) {
      router.push(endpoints.client.chat);
      return;
    }

    setOpenCallDialog(false);
  }, []);

  useEffect(() => {
    if (!peerService) return;
    // @ts-ignore
    peerService?.peer?.addEventListener("negotiationneeded", handleNegoNeeded);

    return () => {
      // @ts-ignore
      peerService?.peer?.removeEventListener(
        "negotiationneeded",
        handleNegoNeeded
      );
    };
  }, [handleNegoNeeded]);

  useEffect(() => {
    if (!peerService) return;
    // @ts-ignore
    peerService?.peer?.addEventListener("track", async (ev) => {
      console.log("cv is here", { ev });
      const rStream = ev.streams;
      setRemoteStream(rStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on(EVENTS.CLIENT.END_CALL, onEndCall);
    socket.on(EVENTS.CLIENT.ACCEPTED_CALL, handleAcceptedCall);
    socket.on(EVENTS.CLIENT.PEER_NEGOTIATION_NEEDED, handleNegoNeededIncoming);
    socket.on(EVENTS.CLIENT.PEER_NEGOTIATION_FINAL, handleNegoFinal);

    return () => {
      socket.off(EVENTS.CLIENT.END_CALL, onEndCall);
      socket.off(EVENTS.CLIENT.ACCEPTED_CALL, handleAcceptedCall);
      socket.off(
        EVENTS.CLIENT.PEER_NEGOTIATION_NEEDED,
        handleNegoNeededIncoming
      );
      socket.off(EVENTS.CLIENT.PEER_NEGOTIATION_FINAL, handleNegoFinal);
    };
  }, [onEndCall]);

  const active = !!activeFriends.find(
    (f) => f.user.username === chatData?.data?.username
  );

  // console.log({ media, remoteStream });

  return (
    <Stack
      justify="space-between"
      align="center"
      bg={colors.background.neutral}
      h={"100%"}
    >
      <Group
        px={10}
        position="apart"
        bg={colors.background.paper}
        w="100%"
        pt={10}
        pb={12}
      >
        <Group
          position="left"
          spacing={xs ? 5 : md ? 10 : 20}
          sx={{ width: "max-content" }}
        >
          <ActionIcon
            h={"auto"}
            w={"auto"}
            size={"md"}
            component={Link}
            href={endpoints.client.chat + `/${router.query?.room}`}
          >
            <Left />
          </ActionIcon>
          <ProfileImage
            size={xs ? 30 : md ? 35 : 40}
            avatar={chatData?.data?.avatar}
            username={chatData?.data?.username}
          />
          <Stack spacing={0}>
            <Text color={colors.text.primary} size={md ? 16 : 18} weight={500}>
              {chatData?.type === "user"
                ? `${chatData?.data?.first_name} ${chatData?.data?.last_name}`
                : ""}
            </Text>
            <Text
              color={colors.text.secondary}
              size={md ? 11 : 14}
              weight={400}
            >
              {active ? (
                <Group spacing={5}>
                  <Badge h={10} p={0} w={10} bg={"green"} />
                  Online
                </Group>
              ) : (
                dayjs().format("MMM D h:mm")
              )}
            </Text>
          </Stack>
        </Group>
        <Drawer
          position="right"
          withCloseButton={false}
          size={340}
          opened={showInfo}
          onClose={() => dispatch(showChatInfo(false))}
        >
          {chatData?.type === "user" ? (
            <ChatInfo type={"user"} user={chatData.data} />
          ) : null}
        </Drawer>
        <Group>
          {md && (
            <>
              <Burger
                opened={showDrawer}
                onClick={() => dispatch(showMainNavDrawer(!showDrawer))}
                size="sm"
                color={colors.text.secondary}
              />
              <MobileNavbarDrawer />
            </>
          )}
          <ActionIcon
            onClick={() => dispatch(showChatInfo(!showInfo))}
            variant="transparent"
            radius={50}
            h={40}
            w={40}
          >
            <Info size={xs ? 18 : md ? 20 : 24} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Group>
      <Stack spacing={80}>
        {remoteStream ? (
          <>
            <h1>Remote stream</h1>
            <ReactPlayer
              muted={false}
              style={{ objectFit: "cover" }}
              height={300}
              width={500}
              playing
              url={remoteStream}
            />
          </>
        ) : null}
        {videoOn && myStream ? (
          <>
            <h1>My stream</h1>
            <ReactPlayer
              muted={false}
              style={{ objectFit: "cover" }}
              height={300}
              width={500}
              playing
              url={myStream}
            />
          </>
        ) : (
          <Box pos={"relative"}>
            {showAnimation && (
              <>
                <motion.div
                  className={classes.circle}
                  style={{
                    height: 90,
                    width: 90,
                    zIndex: 3,
                    translateX: "-50%",
                    translateY: "-50%",
                  }}
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                  className={classes.circle}
                  style={{
                    height: 90,
                    width: 90,
                    zIndex: 2,
                    translateX: "-50%",
                    translateY: "-50%",
                  }}
                  animate={{ scale: [1, 1.8, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                />
                <motion.div
                  className={classes.circle}
                  style={{
                    height: 90,
                    width: 90,
                    zIndex: 2,
                    translateX: "-50%",
                    translateY: "-50%",
                  }}
                  animate={{ scale: [1, 2, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}
                />
              </>
            )}
            <Box pos={"relative"} sx={{ zIndex: 4 }}>
              <ProfileImage
                avatar={chatData?.data?.avatar}
                username={chatData?.data?.username}
                size={80}
              />
            </Box>
          </Box>
        )}
        <Center>
          <Text>Ringing...</Text>
        </Center>
      </Stack>

      <Group position="center" py={16}>
        <Button.Group>
          <Button
            onClick={handleCallEnd}
            variant="filled"
            color="red"
            size={"xl"}
          >
            <Close />
          </Button>

          <Button
            variant="filled"
            size={"xl"}
            color={audioOn ? "indigo" : "gray"}
            onClick={toggleMic}
          >
            {audioOn ? <MicOn /> : <MicOff />}
          </Button>

          <Button
            variant="filled"
            size={"xl"}
            color={videoOn ? "indigo" : "gray"}
            onClick={toggleCamera}
          >
            {videoOn ? <Video /> : <VideoOff />}
          </Button>
        </Button.Group>
      </Group>
    </Stack>
  );
};

const Room = () => {
  const [showAnimation, setShowAnimation] = useState(true);

  const { md } = useBreakPoints();
  const { socket } = useSockets();
  const router = useRouter();

  const handleRejectedCall = useCallback(({ from }: any) => {
    notifications.show({
      id: "rejected-call" + from,
      title: "Rejected Call",
      message: `${from} rejected your call`,
      color: "red",
    });
    router.push(`${endpoints.client.chat}/${router.query?.room}`);
  }, []);

  const handleAcceptedCall = useCallback(({ from }: any) => {
    setShowAnimation(false);
  }, []);

  useEffect(() => {
    if (!socket) return;

    // on sender / caller side
    socket.on(EVENTS.CLIENT.REJECT_CALL, handleRejectedCall);

    // on receiver side
    socket.on(EVENTS.CLIENT.ACCEPT_CALL, handleAcceptedCall);

    return () => {
      socket.off(EVENTS.CLIENT.REJECT_CALL, handleRejectedCall);
      socket.off(EVENTS.CLIENT.ACCEPT_CALL, handleAcceptedCall);
    };
  }, [socket]);

  return (
    <MainLayout showMainNav={!md}>
      <ChatLayout
        content={<Content showAnimation={showAnimation} />}
        showChats={!md}
      />
    </MainLayout>
  );
};

export default Room;
