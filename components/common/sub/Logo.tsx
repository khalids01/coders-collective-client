import Image from "next/image";
import Link from "next/link";
import { images } from "@/constants";

const Logo = ({ size = 35 }: { size?: number }) => {
  return images.logoWhite && process.env.NEXT_PUBLIC_NAME ? (
    <Link href="/">
      <Image
        src={images.logoWhite}
        alt={process.env.NEXT_PUBLIC_NAME}
        width={size}
        height={size}
        className="cover"
      />
    </Link>
  ) : null;
};

export default Logo;
