import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "@/hooks";
import overRiddenMantineThemeProps from "@/constants/mantineTheme";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const { colorScheme, toggleColorScheme } = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withCSSVariables
          withGlobalStyles
          withNormalizeCSS
          theme={{
            ...overRiddenMantineThemeProps,
            colorScheme,
          }}
        >
          <NotificationsProvider>
            <Component {...pageProps} />
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </QueryClientProvider>
  );
}
