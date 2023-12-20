import "@/styles/globals.css";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import theme from "@/styles/theme";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import NavbarComponent from "@/components/layout/NavbarComponent";
// pages/_app.js
import { useEffect } from "react";
import { useRouter } from "next/router";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== "undefined") {
  if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host:
        process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
      // Enable debug mode in development
      loaded: (posthog) => {
        if (process.env.NODE_ENV === "development") posthog.debug();
      },
    });
  }
}

const App = ({ Component, pageProps }: AppProps) => {
  // posthog setup
  const router = useRouter();

  useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog?.capture("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  });

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <PostHogProvider client={posthog}>
          <ChakraProvider theme={theme}>
            <NavbarComponent />
            <Box maxW="container.lg" mx="auto" px={4} py={8}>
              <Component {...pageProps} />
            </Box>
          </ChakraProvider>
        </PostHogProvider>
      </Provider>
    </SessionProvider>
  );
};

export default appWithTranslation(App);
