import { useTheme } from "@/hooks";
import { useMantineTheme, Switch } from "@mantine/core";
import { Sun, Moon } from "@/constants/icons";

const ToggleTheme = () => {
  const { toggleColorScheme, colorScheme, colors } = useTheme();
  const mantineTheme = useMantineTheme();

  return (
    <Switch
      checked={colorScheme === "light"}
      onChange={() => toggleColorScheme()}
      size="lg"
      onLabel={
        <Sun color={mantineTheme.colors.orange[4]} size={20} stroke={2.5} />
      }
      offLabel={
        <Moon color={mantineTheme.colors.blue[4]} size={20} stroke={2.5} />
      }
      sx={{
        label: {
          backgroundColor: `${colors.background.lighter} !important`,
          borderColor: colors.background.lighter + " !important",
          cursor: 'pointer'
        },
      }}
      styles={{
        thumb: {
          backgroundColor: `${colors.card.focus} !important`,
          borderColor: colors.card.focus + " !important",
        },
      }}
    />
  );
};

export default ToggleTheme;
