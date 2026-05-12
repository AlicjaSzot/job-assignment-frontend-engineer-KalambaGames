import Footer from "components/Footer";
import Navbar from "components/Navbar";
import React, { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }): React.ReactElement => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
