"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SearchTabs: React.FC = () => {
  const pathname = usePathname();

  const getActiveClass = (path: string) =>
    pathname === path ? "tab-active" : "";

  return (
    <div role="tablist" className="tabs tabs-boxed">
      <Link
        href="/search"
        role="tab"
        className={`tab ${getActiveClass("/search")}`}
      >
        Search
      </Link>
      <Link href="/new" role="tab" className={`tab ${getActiveClass("/new")}`}>
        New
      </Link>
      <Link
        href="/popular"
        role="tab"
        className={`tab ${getActiveClass("/popular")}`}
      >
        Popular
      </Link>
    </div>
  );
};

export default SearchTabs;
