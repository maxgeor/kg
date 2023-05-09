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
            ? "before:absolute before:-left-4 before:bg-neutral-200 before:h-2 before:w-2 before:rounded-full"
            : null
        }
        ${classes}
      `}
    >
      {name || children}
    </Link>
  );
}
