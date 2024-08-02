"use client";
import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
const Topbar = () => {
  const pathname = usePathname();
  return (
    <nav className="topbar">
      <Link href={"/"} className="flex items-center gap-4">
        <Image src={"/assets/logo.svg"} alt="logo " width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
      </Link>
      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher
          appearance={{
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
        <div className="block md:hidden text-light-1 relative">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-light-2 self-center justify-self-center hover:bg-dark-1 transition-all duration-150 p-3 rounded-full">
              <Image
                alt="menu button"
                src={"/assets/menubutton.svg"}
                width={24}
                height={24}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-light-1 mr-1 min-w-48 hover:bg-dark-4">
              {sidebarLinks.map((link, i): any => {
                const isActive =
                  (pathname.includes(link.route) && link.route.length > 1) ||
                  pathname === link.route;
                return (
                  <Link key={link.route} href={link.route}>
                    <DropdownMenuItem
                      className={`flex items-center justify-start gap-2 p-2 ${
                        isActive ? "bg-primary-500" : ""
                      } m-1`}>
                      <Image
                        src={link.imgURL}
                        alt="ImageUrl"
                        width={20}
                        height={20}
                      />
                      <p className="text-light-2">
                        {link.label.split(/\s+/)[0]}
                      </p>
                    </DropdownMenuItem>
                  </Link>
                );
              })}
            </DropdownMenuContent>

            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem> */}
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
