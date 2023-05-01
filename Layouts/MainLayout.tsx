import { createStyles } from "@mantine/core";
import MainNavbar from "@/components/mainLayout/nav";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeActiveRoute } from "@/redux/slices/activeRouteSlice";
import { withRouter, NextRouter } from "next/router";
import { User } from "@/types";
import { useSockets } from "@/context/socket.context";

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

  useEffect(() => {
    dispatch(changeActiveRoute(router.pathname));
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
