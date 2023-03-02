import { ColorScheme } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks';
import { colors as themeColors, cssColors as CssThemeColors } from '@/constants/customTheme';

const useTheme = () => {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: "mantine-color-scheme",
        defaultValue: "dark",
        getInitialValueInEffect: true,
    });

    const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

    const colors = themeColors[colorScheme]
    const cssColors = CssThemeColors[colorScheme]

    return {
        colorScheme,
        toggleColorScheme,
        colors,
        cssColors
    }
}

export type ColorsType = typeof themeColors.light
export type CSSColorsType = typeof CssThemeColors.light



export default useTheme