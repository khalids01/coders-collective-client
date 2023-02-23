import { useTheme } from "@/hooks";
import { compact } from "../../../utils/compactText";
import { Text, Tooltip } from "@mantine/core";

interface Props {
  text: string;
  length: number;
  withDots?: boolean;
  withToolTip?: boolean;
  color?: string;
}

const CompactText = ({
  text,
  length,
  withDots = true,
  withToolTip = true,
  color,
}: Props) => {
  const { colors, colorScheme } = useTheme();

  if (text.length < length) {
    return <span>{compact(text, length, withDots)}</span>;
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
        <Text color={color ? color : colors.text.primary} component={"span"}>
          {compact(text, length, withDots)}
        </Text>
      </Tooltip>
    );
  }

  return <span>{compact(text, length, withDots)}</span>;
};

export default CompactText;
