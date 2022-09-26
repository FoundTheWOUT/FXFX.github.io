import { useSiteMetadata } from "@/hooks/useSiteMeta";
import React from "react";

interface Props {
  title?: string;
}

const SEO = ({ title }: Props) => {
  const metaData = useSiteMetadata();
  return (
    <>
      <title>{title ? title : metaData.title}</title>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
    </>
  );
};

export default SEO;
