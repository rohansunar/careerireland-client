/* eslint-disable new-cap */
/* eslint-disable camelcase */
import { Noto_Sans } from "next/font/google";

export const noto = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
