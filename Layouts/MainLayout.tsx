import { createStyles } from "@mantine/core";
import MainNavbar from "@/components/mainLayout/nav";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeActiveRoute } from "@/redux/slices/activeRouteSlice";
import { withRouter, NextRouter } from "next/router";

const useStyle = createStyles((theme) => {
  return {
    layout: {
      display: "grid",
      gridTemplateColumns: `80px auto`,
      gridTemplateRows: "100%",
      height: "100%",
      [theme.fn.smallerThan("md")]: {
        gridTemplateColumns: `100%`,
        gridTemplateRows: '60px auto'
      },
    },
  };
});

interface WithRouterProps{
  router: NextRouter,
  children: any
}


const MainLayout = ({ children, router }: WithRouterProps) => {
  const { classes } = useStyle();
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(changeActiveRoute(router.pathname))
  }, [])



  return (
    <div
      className={classes.layout}
    >
      <MainNavbar />
      {children}
    </div>
  );
};

export default withRouter(MainLayout);
