import SearchPage from "@/app/(users)/components/SearchPage";
import React from "react";

function Search() {
  return (
    <main className="flex w-full min-w-[375px] flex-col items-center justify-center overflow-auto transition-all duration-300 ease-in-out">
      <SearchPage />
    </main>
  );
}

export default Search;
