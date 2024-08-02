"use client";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Bottombar = () => {
  const pathname = usePathname();
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link, i): any => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              key={link.route}
              href={link.route}
              className={`bottombar_link ${isActive ? "bg-primary-500" : ""}`}>
              <Image src={link.imgURL} alt="ImageUrl" width={24} height={24} />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Bottombar;
