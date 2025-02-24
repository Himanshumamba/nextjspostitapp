import { Inter } from "next/font/google";
import "./style/global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PostApp",
  description: "Generated by Himanshu Pandey",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
