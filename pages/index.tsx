import Head from "next/head";
import { Header, Hero, Subscription, Footer } from "../components/landing";
import { useTheme } from "@/hooks";
import { GetStaticPropsContext } from "next";

export const getStaticProps = (context: GetStaticPropsContext) => {
  return {
    props: {},
  };
};

export default function Home() {
  const { colors } = useTheme();

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_NAME}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section
          style={{ backgroundColor: colors.landingPage.background.header, minHeight: '100svh' }}
        >
          <Header />
          <Hero />
        </section>
        <Subscription />
        <Footer />
      </main>
    </>
  );
}
