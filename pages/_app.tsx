import "../styles/globals.css";
import { Readex_Pro, Noto_Kufi_Arabic } from "@next/font/google";
import type { AppProps } from "next/app";
const readexPro = Noto_Kufi_Arabic({ subsets: ["arabic"] });
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={readexPro.className}>
      <Component {...pageProps} />
    </main>
  );
}
