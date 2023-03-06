import { Box, BoxProps } from "@mantine/core";

interface DivProps extends BoxProps {
  children?: any;
  d?: "inline-block" | "block" | "flex" | "grid";
  h?: number | string;
  w?: number | string;
  justifyContent?: string;
  items?: string;
  rounded?: number | string;
  placeItems?: string;
  bg?: string;
  wrap?: boolean;
  gap?: string | number;
}

const Div = ({
  d = "block",
  h = "auto",
  w = "auto",
  wrap,
  rounded = 0,
  justifyContent = "auto",
  items = "auto",
  placeItems = "auto",
  bg = "transparent",
  children,
  gap = 0,
  ...props
}: DivProps) => {
  return (
    <Box
      {...props}
      sx={{
        display: d,
        height: h,
        width: w,
        justifyContent,
        alignItems: items,
        placeItems,
        borderRadius: rounded,
        backgroundColor: bg,
        flexWrap: wrap ? "wrap" : "nowrap",
        rowGap: gap,
        columnGap: gap,
        ...props.sx
      }}
    >
      {children}
    </Box>
  );
};

export default Div;
