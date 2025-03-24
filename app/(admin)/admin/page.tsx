import React from "react";
import DashboardPage from "./components/dashboardPage";

async function page() {
  return (
    <main className="flex flex-1 flex-col ">
      <DashboardPage />
    </main>
  );
}

export default page;
