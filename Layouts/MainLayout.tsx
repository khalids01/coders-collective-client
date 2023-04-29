import { createStyles, Text } from "@mantine/core";
import MainNavbar from "@/components/mainLayout/nav";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeActiveRoute } from "@/redux/slices/activeRouteSlice";
import { withRouter, NextRouter } from "next/router";
import { Message, User } from "@/types";
import { useSockets } from "@/context/socket.context";
import { EVENTS } from "@/constants/socketConfig";
import { showNotification } from "@mantine/notifications";
import { compact } from "@/utils/compactText";
import { ProfileImage } from "@/components/common/sub";
import { endpoints, sounds } from "@/constants";
import Link from "next/link";
import useSound from "use-sound";

const useStyle = createStyles((theme) => {
  return {
    layout: {
      display: "grid",
      gridTemplateColumns: `80px auto`,
      gridTemplateRows: "100%",
      height: "100vh",
      [theme.fn.smallerThan("md")]: {
        gridTemplateColumns: `100%`,
        gridTemplateRows: "auto",
      },
    },

    withNav: {
      [theme.fn.smallerThan("md")]: {
        gridTemplateRows: `70px auto !important`,
      },
    },
  };
});

interface WithRouterProps {
  router: NextRouter;
  children: any;
  showMainNav?: boolean;
}

export interface SocketUser {
  userId: string;
  socketId: string;
  userInfo: User;
}

const MainLayout = ({
  children,
  router,
  showMainNav = true,
}: WithRouterProps) => {
  const { classes } = useStyle();
  const dispatch = useDispatch();
  const { socket } = useSockets();
  
  useEffect(() => {
    dispatch(changeActiveRoute(router.pathname));
    if (!socket) return;


    // socket.on(EVENTS.CLIENT.GET_CONVERSATION_NEW_MESSAGE, (data: Message) => {
    //   if (router.query?.chat_name === data.sender.username) return;

    //   showNotification({
    //     id: data.sender.username,
    //     title: (
    //       <Text
    //         href={`${endpoints.client.chat}/${data.sender.username}`}
    //         component={Link}
    //       >
    //         {data.sender.username}
    //       </Text>
    //     ),
    //     message: (
    //       <Text
    //         href={`${endpoints.client.chat}/${data.sender.username}`}
    //         component={Link}
    //       >
    //         {data.message.text
    //           ? compact(data.message.text, 20, true)
    //           : data.message.images && "Image"}
    //       </Text>
    //     ),
    //     icon: (
    //       <ProfileImage
    //         size={35}
    //         username={data.sender.username}
    //         avatar={data.sender.avatar}
    //       />
    //     ),
    //     styles: {
    //       title: {
    //         cursor: "pointer",
    //         a:{
    //           display: 'block',
    //         }
    //       },
    //       description: {
    //         cursor: "pointer",
    //         a:{
    //           display: 'block',
    //         }
    //       },
    //     },
    //   });
    // });
  }, []);

  return (
    <>
      <div
        className={`${classes.layout} ${showMainNav ? classes.withNav : ""}`}
      >
        {showMainNav ? <MainNavbar /> : null}
        {children}
      </div>
    </>
  );
};

export default withRouter(MainLayout);
