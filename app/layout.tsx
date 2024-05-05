// import { ClerkProvider } from "@clerk/nextjs";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

import { Footer, NavBar } from "@components";

export const metadata = {
  title: "Bike Hub",
  description: "Discover world's best bike showcase application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className='relative'>
          <NavBar />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
