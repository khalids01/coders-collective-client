import { useBreakPoints } from "@/hooks";
import DesktopNav from "./DesktopNav";
import MobileNav from './MobileNav'

const CustomNavbar = () => {
  const { md } = useBreakPoints();

  if (md) {
    return <MobileNav />;
  }

  return <DesktopNav />;
};

export default CustomNavbar;
