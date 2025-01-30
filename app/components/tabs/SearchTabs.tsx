"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchTabs: React.FC = () => {
  const pathname = usePathname();
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getActiveClass = (path: string) =>
    pathname === path ? "bg-red-500 text-white" : "";

  if (!isMobileView) return null;

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
