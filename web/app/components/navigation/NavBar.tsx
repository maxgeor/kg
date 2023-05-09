"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NavLink from "./NavLink";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-40 bg-black/[85%] col-span-full text-sm">
      <div className="relative grid grid-cols-4 gap-y-3 gap-x-6 p-6">
        <Link
          href="/"
          className="h-full z-10 absolute md:static top-6 right-6 text-lg leading-6 font-serif self-start -my-1 "
        >
          KG
        </Link>
        <div className="col-span-2 md:col-span-1 flex flex-col gap-y-3 self-start">
          <NavLink
            href="/knives"
            name="Knives"
            isActive={pathname.startsWith("/knives")}
          />
          <NavLink
            href="/projects"
            name="Special Projects"
            isActive={pathname.startsWith("/projects")}
          />
        </div>
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 self-start">
          <div className="col-span-1 flex flex-col gap-3">
            <NavLink
              href="/news"
              name="News"
              isActive={pathname.startsWith("/news")}
            />
            <NavLink
              href="/about"
              name="About"
              isActive={pathname.startsWith("/about")}
            />
          </div>
          <NavLink
            href="/contact"
            name="Contact"
            isActive={pathname.startsWith("/contact")}
            classes="self-start"
          />
        </div>
      </div>
      {/* <div className="grid md:hidden grid-cols-2 col-start-3 col-end-5 gap-y-1 self-start">
        <div className="flex col-span-2">
          <NavLink
            href="/knives"
            name="Knives"
            isActive={pathname.startsWith("/knives")}
          />
          <span className="mr-2">,</span>
          <NavLink
            href="/projects"
            name="Special Projects"
            isActive={pathname.startsWith("/projects")}
          />
        </div>
        <p className="flex col-span-2">
          <NavLink
            href="/news"
            name="News"
            isActive={pathname.startsWith("/news")}
          />
          <span className="mr-2">,</span>
          <NavLink
            href="/about"
            name="About"
            isActive={pathname.startsWith("/about")}
          />
          <span className="mr-2">,</span>
          <NavLink
            href="/contact"
            name="Contact"
            isActive={pathname.startsWith("/contact")}
          />
        </p>
      </div>
      <div className="hidden md:grid grid-cols-3 col-span-2 md:col-span-3 gap-6 self-start">
        <div className="col-span-1 flex flex-col gap-y-3 self-start">
          <NavLink
            href="/knives"
            name="Knives"
            isActive={pathname.startsWith("/knives")}
          />
          <NavLink
            href="/projects"
            name="Special Projects"
            isActive={pathname.startsWith("/projects")}
          />
        </div>
        <div className="col-span-1 flex flex-col gap-y-3">
          <NavLink
            href="/news"
            name="News"
            isActive={pathname.startsWith("/news")}
          />
          <NavLink
            href="/about"
            name="About"
            isActive={pathname.startsWith("/about")}
          />
        </div>
        <NavLink
          href="/contact"
          name="Contact"
          isActive={pathname.startsWith("/contact")}
          classes="self-start"
        />
      </div> */}
    </nav>
  );
}
