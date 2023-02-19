import { ColorScheme } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks';
import themeColors from '../constants/customTheme';

const useTheme = () => {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: "mantine-color-scheme",
        defaultValue: "light",
        getInitialValueInEffect: true,
    });

    const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

    const colors = themeColors[colorScheme]

    return {
        colorScheme,
        toggleColorScheme,
        colors,
    }
}

export default useTheme