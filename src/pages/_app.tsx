import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { ManagedUIContext } from "@contexts/ui.context";
import ManagedModal from "@components/common/modal/managed-modal";
import { useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ToastContainer } from "react-toastify";
import { appWithTranslation } from "next-i18next";
import { DefaultSeo } from "@components/common/default-seo";

import { Provider } from "react-redux";
import store from "../redux/store/store";

// Load Open Sans and comfortaa typeface font
import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/comfortaa";
// external
import "react-toastify/dist/ReactToastify.css";
// base css file
import "@styles/scrollbar.css";
import "@styles/swiper-carousel.css";
import "@styles/custom-plugins.css";
import "@styles/tailwind.css";
import { getDirection } from "@utils/get-direction";

/* import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
*/
///require("antd/dist/antd.less");
// import "antd/dist/antd.css";

function handleExitComplete() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0 });
  }
}

const Noop: React.FC = ({ children }) => <>{children}</>;

const CustomApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  const queryClientRef = useRef<any>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  const router = useRouter();
  const dir = getDirection(router.locale);
  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);
  const Layout = (Component as any).Layout || Noop;

  return (
    //<ConfigProvider locale={ptBR}>
    <SessionProvider session={session}>
      <Provider store={store}>
        <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
          <QueryClientProvider client={queryClientRef.current}>
            <Hydrate state={pageProps.dehydratedState}>
              <ManagedUIContext>
                <Layout pageProps={pageProps}>
                  <DefaultSeo />
                  <Component {...pageProps} key={router.route} />
                  <ToastContainer />
                </Layout>
                <ManagedModal />
              </ManagedUIContext>
            </Hydrate>
            {/* <ReactQueryDevtools /> */}
          </QueryClientProvider>
        </AnimatePresence>
        {/* //</ConfigProvider> */}
      </Provider>
    </SessionProvider>
  );
};

export default appWithTranslation(CustomApp);
