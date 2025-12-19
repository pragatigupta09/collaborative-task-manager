import { ReactNode } from "react";
import Navbar from "./Navbar";

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="p-6">{children}</main>
    </>
  );
}
