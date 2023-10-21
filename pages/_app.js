import gsap from "gsap";
import React from "react";

gsap.defaults({ ease: "linear" });

import { Globals } from "@react-spring/shared";
Globals.assign({
  frameLoop: "always",
});

import Preloader from "components/common/Preloader";

import useCalcVh from "hooks/useCalcVh";
import useFoucFix from "hooks/useFoucFix";
import useResponsible from "hooks/useResponsible";
import { StoreProvider } from "contexts/ZustandProvider";
import SoundProvider from "contexts/SoundProvider";
import { useHydrate } from "utils/store";

import "styles/reset.css";
import "styles/globals.css";
import "styles/colors.css";
import "styles/locomotive.css";
import "styles/fonts.css";
import PageTransition from "components/common/PageTransition/PageTransition";

export default function App({ Component, router, pageProps }) {
  const store = useHydrate(pageProps.cms);
  const { isLoaded, setLoaded } = store();

  const handleLoaded = React.useCallback(() => {
    setLoaded(true);
  }, [setLoaded]);

  useFoucFix();
  useResponsible();
  useCalcVh();

  return (
    <StoreProvider store={store}>
      <PageTransition route={router.route}>
        <Component {...pageProps} />
      </PageTransition>
      {/* {!isLoaded && (
        <Preloader
          // preloadedImages={pageProps.preloadedImages}
          onLoaded={handleLoaded}
        />
      )} */}
    </StoreProvider>
  );
}
