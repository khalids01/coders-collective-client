import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/core";

const useBreakPoints = () => {
    const theme = useMantineTheme()
    // by max width
    const xs = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`)
    const sm = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)
    const md = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`)
    const lg = useMediaQuery(`(max-width: ${theme.breakpoints.lg}px)`)
    const xl = useMediaQuery(`(max-width: ${theme.breakpoints.xl}px)`)
    const xxl = useMediaQuery("(max-width: 1560px)");

    // by min width
    const ixs = useMediaQuery(`(min-width: ${theme.breakpoints.xs}px)`)
    const ism = useMediaQuery(`(min-width: ${theme.breakpoints.sm}px)`)
    const imd = useMediaQuery(`(min-width: ${theme.breakpoints.md}px)`)
    const ilg = useMediaQuery(`(min-width: ${theme.breakpoints.lg}px)`)
    const ixl = useMediaQuery(`(min-width: ${theme.breakpoints.xl}px)`)
    const ixxl = useMediaQuery("(min-width: 1560px)");

    return { xs, sm, md, lg, xl, xxl, ixs, ism, imd, ilg, ixl, ixxl }
}

export default useBreakPoints;