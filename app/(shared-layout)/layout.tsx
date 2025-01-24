import React from "react";
import SearchTabs from "../components/tabs/SearchTabs";

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SearchTabs />
      {children}
    </div>
  );
}
