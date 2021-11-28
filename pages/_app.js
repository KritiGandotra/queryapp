import "../styles/global.css";
import "../styles/google.css";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />;
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
