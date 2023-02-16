import Layout from "@/components/Layout";
import Head from "next/head";
import "../styles/global.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          try{
            const mql = window.matchMedia('(prefers-color-scheme: dark)');
            document.documentElement.dataset['theme'] = "system"
            const colorScheme = localStorage['user-color-scheme']
            if (colorScheme === "dark" || (colorScheme === "system" && mql.matches) || (!colorScheme && mql.matches)) {
              document.documentElement.classList.add("dark");
              document.documentElement.dataset['theme'] = "dark"
            } else {
              document.documentElement.classList.remove("dark");
            }
            if (colorScheme === "light"){
              document.documentElement.dataset['theme'] = "light"
            }
          } catch (e) {
            console.error(e)
          }
      `,
          }}
        />
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
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
