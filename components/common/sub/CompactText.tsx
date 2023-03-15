import { useTheme } from "@/hooks";
import { compact } from "../../../utils/compactText";
import { Text, Tooltip } from "@mantine/core";

interface Props {
  text: string;
  length: number;
  withDots?: boolean;
  withToolTip?: boolean;
  color?: string;
  size?: number;
}

const CompactText = ({
  text,
  length,
  withDots = true,
  withToolTip = true,
  color,
  size = 16,
}: Props) => {
  const { colors } = useTheme();

  if (text.length < length) {
    return (
      <Text
        size={size}
        color={color ? color : colors.text.primary}
        component={"span"}
      >
        {text}
      </Text>
    );
  }

  if (withToolTip) {
    return (
      <Tooltip
        offset={15}
        position="top-start"
        sx={{
          background: colors.background.paper,
          boxShadow: `0 0 10px ${colors.shadows.paper}`,
        }}
        color=""
        label={
          <Text color={colors.text.primary} weight={400} size={12}>
            {text}
          </Text>
        }
      >
        <Text
          size={size}
          color={color ? color : colors.text.primary}
          component={"span"}
        >
          {compact(text, length, withDots)}
        </Text>
      </Tooltip>
    );
  }

  return <span>{compact(text, length, withDots)}</span>;
};

export default CompactText;
