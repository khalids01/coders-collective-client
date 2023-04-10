import { createStyles } from "@mantine/core";
import MainNavbar from "@/components/mainLayout/nav";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { changeActiveRoute } from "@/redux/slices/activeRouteSlice";
import { withRouter, NextRouter } from "next/router";
import { useBreakPoints, useChat, useMessage, useUser } from "@/hooks";
import { io, Socket } from "socket.io-client";
import { endpoints } from "@/constants";
import { User } from "@/types";

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
  const { user } = useUser();
  const { setActiveUsers } = useChat();
  const { sendMessageData } = useMessage();

  useEffect(() => {
    dispatch(changeActiveRoute(router.pathname));
  }, []);

  useEffect(() => {
    if (!user?._id) return;

    const socket = io(process.env.NEXT_PUBLIC_WS || "http://localhost:3005");

    socket.on("connect", () => {});

    socket.emit(endpoints.server.socketIo.addUser, user?._id, user);

    socket.on(endpoints.server.socketIo.getUser, (users: SocketUser[]) => {
      setActiveUsers(users);
    });

    socket.emit(endpoints.server.socketIo.sendMessage, sendMessageData);

    return () => {
      socket.disconnect();
    };
  }, [user?._id]);

  return (
    <div className={`${classes.layout} ${showMainNav ? classes.withNav : ""}`}>
      {showMainNav ? <MainNavbar /> : null}
      {children}
    </div>
  );
};

export default withRouter(MainLayout);
