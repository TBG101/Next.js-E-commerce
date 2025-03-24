import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default LayoutWrapper;
