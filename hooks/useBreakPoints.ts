import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/core";

const useBreakPoints = () => {
    const theme = useMantineTheme()
    // by max width
    const xs = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`)
    const sm = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)
    const md = useMediaQuery(`(max-width: ${theme.breakpoints.md})`)
    const lg = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`)
    const xl = useMediaQuery(`(max-width: ${theme.breakpoints.xl})`)
    const xxl = useMediaQuery("(max-width: 1560px)");

    // by min width
    const ixs = useMediaQuery(`(min-width: ${theme.breakpoints.xs})`)
    const ism = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`)
    const imd = useMediaQuery(`(min-width: ${theme.breakpoints.md})`)
    const ilg = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`)
    const ixl = useMediaQuery(`(min-width: ${theme.breakpoints.xl})`)
    const ixxl = useMediaQuery("(min-width: 1560px)");

    return { xs, sm, md, lg, xl, xxl, ixs, ism, imd, ilg, ixl, ixxl }
}

export default useBreakPoints;