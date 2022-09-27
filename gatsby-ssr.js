import React from "react";
import Layout from "./src/components/Layout";

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
        try{
          const mql = window.matchMedia('(prefers-color-scheme: dark)');
          const colorScheme = localStorage['user-color-scheme']
          if (colorScheme === "dark" || (colorScheme === "system" && mql.matches) || (!colorScheme && mql.matches)) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        } catch (e) {
          console.error(e)
        }
      `,
        }}
      />
    </>
  );
};
