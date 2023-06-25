import "./globals.css";
import { Providers } from "@/lib/Providers";
import Navbar from "./components/client/Navbar";
import Footer from "./components/client/Footer";
import "tw-elements/dist/css/tw-elements.min.css";

export const metadata = {
  title: "Todo App",
  description: "blah blah",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`  h-screen font-montserrat`}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
