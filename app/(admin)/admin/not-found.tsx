import Link from "next/link";
import React from "react";

async function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return to admin</Link>
    </div>
  );
}

export default NotFound;
