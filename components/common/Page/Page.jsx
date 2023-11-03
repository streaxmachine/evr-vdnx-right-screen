import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { removeQueries } from "utils/string";
// import Header from "../Header/Header";

const seo = {
  title: "EVR",
  description: "Evr",
  url: "https://www.reclaim-your-dna-html.heycusp.com",
  domain: "https://www.reclaim-your-dna-html.heycusp.com",
  image: "/og.jpg",
  theme: "#000000",
};

const Page = ({
  title,
  image,
  theme,
  keywords,
  description,
  children,
  showHeaderFooter = true,
}) => {
  const { asPath } = useRouter();

  const fullTitle = React.useMemo(
    () => [seo.title, title].join(title ? " | " : ""),
    [title]
  );

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="description" content={description || seo.description} />
        <meta name="keywords" content={keywords || ""} />
        <meta name="theme-color" content={theme || seo.theme} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content={description || seo.description}
        />
        <meta property="og:url" content={`${seo.url}${asPath}`} />
        <meta property="og:image" content={removeQueries(image) || seo.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content={seo.domain || ""} />
        <meta property="twitter:url" content={`${seo.url}${asPath}`} />
        <meta name="twitter:title" content={fullTitle} />
        <meta
          name="twitter:description"
          content={description || seo.description}
        />
        <meta
          name="twitter:image"
          content={removeQueries(image) || seo.image}
        />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      {/* <Header /> */}
      {children}
    </>
  );
};

Page.defaultProps = {
  isPreloader: true,
};

export default React.memo(Page);
