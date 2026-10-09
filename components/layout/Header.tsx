import Link from "next/link";
import { getPublicNavLinks, getSiteSetting } from "@/lib/public-queries";
import HeaderNav from "./HeaderNav";
import SearchTrigger from "@/components/search/SearchTrigger";
import ThemeToggle from "./ThemeToggle";
import { DesktopAuthArea, MobileProfileLink } from "./HeaderAuth";

export default async function Header() {
  const navLinks = await getPublicNavLinks("header");
  const logo = await getSiteSetting("site_logo");

  return (
    <header className="bg-surface-container/70 backdrop-blur-xl border-b border-on-surface/10 shadow-2xl shadow-background/50">
      <nav className="flex items-center justify-between px-container-padding-mobile md:px-container-padding-desktop h-20 max-w-7xl mx-auto">
        <div className="cursor-pointer shrink-0">
          <Link href="/">
            {logo ? (
              <img src={logo} alt="Marifetli Kedi" loading="eager" className="h-12 w-auto object-contain" />
            ) : (
              <span className="text-headline-sm md:text-headline-md tracking-tight text-primary">
                Marifetli Kedi
              </span>
            )}
          </Link>
        </div>
        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle />
          <SearchTrigger />
          <MobileProfileLink />
        </div>
        <HeaderNav
          links={[
            ...navLinks,
            {
              id: "eglenceli-testler",
              label: "Eğlenceli Testler",
              url: "/eglenceli-testler",
              position: "header",
              sort_order: 99,
              active: true,
            },
          ]}
        />
        <div className="hidden md:flex items-center gap-1 md:gap-2">
          <ThemeToggle />
          <SearchTrigger />
          <DesktopAuthArea />
        </div>
      </nav>
    </header>
  );
}
