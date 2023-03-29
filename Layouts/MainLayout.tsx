import { createStyles } from "@mantine/core";
import MainNavbar from "@/components/mainLayout/nav";


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

const ChatLayout = ({ children }: { children: any }) => {
  const { classes } = useStyle();

  return (
    <div
      className={classes.layout}
    >
      <MainNavbar />
      {children}
    </div>
  );
};

export default ChatLayout;
