import Link from "next/link";

export default function NavLink({
  href,
  name,
  isActive = false,
  children,
  classes,
}: {
  href: string;
  name?: string;
  isActive?: boolean;
  children?: React.ReactNode;
  classes?: string;
}) {
  return (
    <Link
      href={href}
      className={`
        relative flex items-center col-span-1 -my-1 
        ${
          isActive
            ? "before:absolute before:-left-3.5 before:bg-white before:h-1.5 before:w-1.5 before:rounded-full"
            : null
        }
        ${classes}
      `}
    >
      {name || children}
    </Link>
  );
}
