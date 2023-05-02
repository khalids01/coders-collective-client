import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "@/hooks";
import overRiddenMantineThemeProps from "@/constants/mantineTheme";
import { useState, useEffect } from "react";
import { Provider as ReduxStoreProvider } from "react-redux";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { store } from "@/redux/store";
import SocketProvider from "@/context/socket.context";

function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())
  const { colorScheme, toggleColorScheme } = useTheme();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <></>;
  }

  return isMounted ? (
    <ReduxStoreProvider store={store}>
      <SocketProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools position="top-left" initialIsOpen={false}/>
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
              <main className={colorScheme}>
                <Notifications position="top-center" />
                <Component {...pageProps} />
              </main>
            </MantineProvider>
          </ColorSchemeProvider>
        </QueryClientProvider>
      </SocketProvider>
    </ReduxStoreProvider>
  ) : null;
}

export default App