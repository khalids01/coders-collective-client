import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "@/hooks";
import overRiddenMantineThemeProps from "@/constants/mantineTheme";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const { colorScheme, toggleColorScheme } = useTheme();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <></>;
  }

  return isMounted ? (
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
            <main className={colorScheme}>
              <Component {...pageProps} />
            </main>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </QueryClientProvider>
  ) : null;
}
