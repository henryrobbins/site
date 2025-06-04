import {
  Navbar as HeroUINavbar,
  Link,
  NavbarBrand,
  NavbarContent,
} from "@heroui/react";

// Navigation tree
const navLinks = [
  { href: "/", text: "Home" },
  { href: "/artwork", text: "Art" },
  { href: "/projects", text: "Projects" },
  { href: "/experiences", text: "Experience" },
];

export default function Navbar({ currentPath }: { currentPath: string }) {
  return (
    <HeroUINavbar
      isBlurred={false}
      isBordered={true}
      maxWidth="full"
      height={"3rem"}
    >
      <NavbarBrand>
        <div className="flex flex-row gap-2 items-center cursor-pointer">
          <Link href="/">
            <h1 className="text-xl font-bold text-[hsl(var(--heroui-content1-foreground))]">
              Henry Robbins
            </h1>
          </Link>
        </div>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <div className="absolute left-1/2 transform -translate-x-1/2"></div>
        {navLinks.map((link) => (
          <Link
            href={link.href}
            color="foreground"
            className={`${currentPath == link.href ? "font-semibold" : ""}`}
          >
            {currentPath == link.href ? `[ ${link.text} ]` : link.text}
          </Link>
        ))}
      </NavbarContent>
    </HeroUINavbar>
  );
}
