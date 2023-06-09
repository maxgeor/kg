import "./globals.css";
import { Inter } from "next/font/google";
import Grid from "./components/Grid";
import NavBar from "./components/navigation/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KG Handcrafted Bladeware",
  description:
    "Functional, Hartsfield-inspired blades, carefully crafted with natural materials",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{ textRendering: "optimizeLegibility" }}
        className={`
          ${inter.className}
          relative bg-black text-white text-sm min-h-screen antialiased
        `}
      >
        <Grid gap="gap-x-6 gap-y-24" className="max-w-[1800px] mx-auto">
          <NavBar />
          <Grid
            tag="main"
            gap="gap-x-6 gap-y-24"
            className="pt-0 px-6 pb-24 -mt-6"
          >
            {children}
          </Grid>
        </Grid>
      </body>
    </html>
  );
}
