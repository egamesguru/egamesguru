import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import * as Icons from "@heroicons/react/24/solid";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { tv } from "tailwind-variants";
import SignInButton from "./SignInButton";
import MobileSignInButton from "./MobileSignInButton";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const navBarLinkStyle = tv({
  base: "p-2",
  variants: {
    active: {
      false: "text-default-500",
      true: "text-primary",
    },
  },
});

const NavBarLink = ({
  href,
  label,
  active = false,
  children,
}: {
  href: string;
  label: string;
  active?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Button
      as={Link}
      isIconOnly
      className={navBarLinkStyle({ active })}
      variant="light"
      aria-pressed
      size="lg"
      href={href}
      aria-label={label}
    >
      {children}
    </Button>
  );
};

const NavBarLinkSidebar = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link href={href} color="foreground" size="lg" className="font-semibold">
      {children}
    </Link>
  );
};

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col h-screen md:hidden">
      <header className="py-3 px-4 flex justify-between">
        <Link href="/" color="foreground" className="text-2xl font-bold">
          eGamesGuru
        </Link>

        {/* <Button isIconOnly variant="light"> */}
        {/*   <Icons.Bars3Icon className="w-8" /> */}
        {/* </Button> */}

        <div className="h-16 flex items-center">
          <MobileSignInButton />
        </div>
      </header>
      <div className="flex-grow overflow-auto px-4 py-2">{children}</div>
      <nav className="flex px-2 justify-evenly w-full">
        <NavBarLink href="/" label="Newsfeed" active>
          <Icons.NewspaperIcon />
        </NavBarLink>
        <NavBarLink href="/contendership" label="Contendership">
          <Icons.NumberedListIcon />
        </NavBarLink>
        {/* <NavBarLink href="/pinnwand" label="Pinnwand"> */}
        {/*   <Icons.VideoCameraIcon /> */}
        {/* </NavBarLink> */}
        <NavBarLink href="/shop" label="Shop">
          <Icons.BuildingStorefrontIcon />
        </NavBarLink>
        <NavBarLink href="/agency" label="Agency">
          <Icons.PresentationChartLineIcon />
        </NavBarLink>
      </nav>
    </div>
  );
};

const DesktopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="hidden md:flex h-screen">
      <div className="p-6 pt-10 w-md flex flex-col min-w-0">
        <header>
          <Link href="/" color="foreground" className="text-3xl font-bold">
            eGamesGuru
          </Link>
        </header>
        <div className="flex flex-col justify-between items-stretch max-w-full grow">
          <nav className="mt-8 flex flex-col gap-4">
            <NavBarLinkSidebar href="/">Newsfeed</NavBarLinkSidebar>
            <NavBarLinkSidebar href="/contendership">
              Contendership
            </NavBarLinkSidebar>
            <NavBarLinkSidebar href="/shop">Shop</NavBarLinkSidebar>
            <NavBarLinkSidebar href="/agency">Agency</NavBarLinkSidebar>
          </nav>

          <div className="max-w-full">
            <SignInButton />
          </div>
        </div>
      </div>
      <div className="pt-10 w-full overflow-y-hidden max-h-screen">
        {children}
      </div>
    </div>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <MobileLayout>{children}</MobileLayout>
          <DesktopLayout>{children}</DesktopLayout>
        </Providers>
      </body>
    </html>
  );
}
