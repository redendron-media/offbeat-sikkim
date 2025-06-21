"use client";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { destinations } from "@/constants";
import { cn } from "@/lib/utils";
import { IconButton, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ContactDialog from "./contact-dialog/page";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import ListItem from "./list-item/page";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import PhoneIcon from "@mui/icons-material/Phone";

interface NavbarScrollProps {
  toggleMenu: () => void;
  isScrolling: boolean;
}

function Header() {
  const [navbar, setNavbar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  // Fixed responsive detection with proper window check
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Check if current route is a packages route
  const isPackagesRoute =
    pathname === "/packages" || pathname.startsWith("/packages/");

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    // Initial check
    checkScreenSize();

    // Add resize listener
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleMenu = () => {
    setNavbar((prevOpen) => !prevOpen);
  };

  const menuVars = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.61, 1, 0.88, 1],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.61, 1, 0.88, 1],
      },
    },
  };

  const linkVars = {
    initial: {
      opacity: 0.8,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.6,
        duration: 1,
        ease: [0.61, 1, 0.88, 1],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.1,
        ease: [0.61, 1, 0.88, 1],
      },
    },
  };

  const NavAnimations = {
    initial: {
      opacity: 1,
      boxShadow: "none",
      paddingTop: "1.5rem",
      paddingBottom: "1.5rem",
      backgroundColor: "transparent",
      transition: {
        duration: 0.7,
        ease: [0.33, 1, 0.68, 1],
      },
    },
    animate: {
      opacity: 1,
      boxShadow: "0 4px 6px -2px rgba(0,0,0,0.1)",
      paddingTop: isSmallScreen ? "1.25rem" : "1rem",
      paddingBottom: isSmallScreen ? "1.25rem" : "1rem",
      backgroundColor: "#fff",
      transition: {
        duration: 0.7,
        ease: [0.33, 1, 0.68, 1],
      },
    },
    backToTop: {
      paddingTop: "1.5rem",
      paddingBottom: "1.5rem",
      opacity: 1,
      boxShadow: "none",
      transition: {
        duration: 0.7,
        ease: [0.33, 1, 0.68, 1],
      },
    },
    exit: {
      paddingTop: "1.5rem",
      paddingBottom: "1.5rem",
      y: 0,
      opacity: 1,
      backgroundColor: "transparent",
      transition: {
        duration: 0.3,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollOffset = window.scrollY;

      if (scrollOffset > 10) {
        setIsScrolled(true);
      } else if (scrollOffset === 0) {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const Navbar: React.FC<NavbarScrollProps> = ({ toggleMenu, isScrolling }) => {
    return (
      <motion.nav
        initial="initial"
        animate={isScrolling ? "animate" : "initial"}
        exit="exit"
        variants={NavAnimations}
        className="fixed top-0 z-50 flex flex-row w-full justify-between px-4 md:px-6 py-6 md:py-9 transition-colors duration-700"
        style={{
          backgroundColor: isScrolling ? "#fff" : "transparent",
          transition: "background-color 0.7s",
        }}
      >
        <Link href={"/"}>
          <Image
            className="md:w-28 md:h-9 lg:w-40 lg:h-11"
            src={"/logo.svg"}
            width={96}
            height={28}
            alt="logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <Stack
          className="hidden items-center lg:flex"
          direction={"row"}
          spacing={3}
        >
          <motion.div variants={linkVars}>
            <Link
              className={cn(
                "space-y-6 hover:text-primary duration-700 transition-colors",
                isExactPath("/packages")
                  ? "text-primary"
                  : isHomepage
                    ? isScrolled
                      ? "text-black"
                      : "text-white"
                    : "text-black"
              )}
              href={"/packages"}
            >
              <p className="bodyl xl:titlel">Packages</p>
            </Link>
          </motion.div>

          <motion.div variants={linkVars}>
            <NavigationMenu
              className={cn(
                "space-y-6 hover:text-primary duration-700 transition-colors cursor-pointer",
                isSubPath("/packages")
                  ? "text-primary"
                  : isHomepage
                    ? isScrolled
                      ? "text-black"
                      : "text-white"
                    : "text-black"
              )}
            >
              <NavigationMenuList className="bg-none">
                <NavigationMenuItem className="bg-none">
                  <NavigationMenuTrigger className="bodyl xl:titlel">
                    Destinations
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[200px] grid-cols-1 bg-white text-black">
                      {destinations.map((destination) => (
                        <ListItem
                          key={destination.id}
                          title={destination.name}
                          href={destination.link}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </motion.div>

          <motion.div variants={linkVars}>
            <Link
              className={cn(
                "space-y-6 hover:text-primary duration-700 transition-colors",
                isExactPath("/blog")
                  ? "text-primary"
                  : isHomepage
                    ? isScrolled
                      ? "text-black"
                      : "text-white"
                    : "text-black"
              )}
              href={"/blog"}
            >
              <p className="bodyl xl:titlel">Blog</p>
            </Link>
          </motion.div>

          <motion.div variants={linkVars}>
            <Link
              className={cn(
                "space-y-6 hover:text-primary duration-700 transition-colors",
                isExactPath("/about")
                  ? "text-primary"
                  : isHomepage
                    ? isScrolled
                      ? "text-black"
                      : "text-white"
                    : "text-black"
              )}
              href={"/about"}
            >
              <p className="bodyl xl:titlel">About</p>
            </Link>
          </motion.div>

          <motion.div variants={linkVars}>
            <Link
              className={cn(
                "space-y-6 hover:text-primary duration-700 transition-colors",
                isExactPath("/contact")
                  ? "text-primary"
                  : isHomepage
                    ? isScrolled
                      ? "text-black"
                      : "text-white"
                    : "text-black"
              )}
              href={"/contact"}
            >
              <p className="bodyl xl:titlel">Contact</p>
            </Link>
          </motion.div>

          <ContactDialog link="" title="Enquire Now" />
        </Stack>

        {/* Phone Number Section */}
        <div className="bodyl xl:titlel items-center">
          <div className="hidden lg:flex gap-2 items-center h-full">
            <PhoneIcon
              className={cn(
                isHomepage
                  ? isScrolled
                    ? "text-black"
                    : "text-white"
                  : "text-black"
              )}
            />
            <span
              className={cn(
                isHomepage
                  ? isScrolled
                    ? "text-black"
                    : "text-white"
                  : "text-black"
              )}
            >
              +91 7029749687
            </span>
          </div>
          <div className="lg:hidden">
            <Link className="flex gap-2 items-center" href="tel:+917029749687">
              <PhoneIcon
                className={cn(
                  isHomepage
                    ? isScrolled
                      ? "text-black"
                      : "text-white"
                    : "text-black"
                )}
              />
              <span
                className={cn(
                  isHomepage
                    ? isScrolled
                      ? "text-black"
                      : "text-white"
                    : "text-black"
                )}
              >
                +91 7029749687
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button - Hide on packages routes for mobile devices */}
        {(!isPackagesRoute || !isSmallScreen) && (
          <IconButton
            className="lg:hidden rounded-none p-0 main-navbar-toggle-button"
            onClick={toggleMenu}
          >
            <MenuIcon
              className={cn(
                isHomepage
                  ? isScrolled
                    ? "text-black"
                    : "text-white"
                  : "text-black"
              )}
            />
          </IconButton>
        )}
      </motion.nav>
    );
  };

  const isExactPath = (path: string) => pathname === path;
  const isSubPath = (path: string) =>
    pathname.startsWith(path) && pathname !== path;

  return (
    <>
      <AnimatePresence>
        {/* Only render the navbar if it's not a packages route on mobile or if it's desktop */}
        {(!isPackagesRoute || !isSmallScreen) && (
          <Navbar toggleMenu={toggleMenu} isScrolling={isScrolled} />
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {navbar && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 z-60 h-screen w-full origin-top bg-white px-8 md:px-24 py-6"
          >
            <div className="w-full relative h-full">
              <motion.div variants={linkVars} className="relative">
                <IconButton
                  size="large"
                  onClick={toggleMenu}
                  className="bg-transparent fixed right-4 top-6 p-0 main-navbar-close-button z-70"
                >
                  <CloseIcon />
                </IconButton>
              </motion.div>

              <div className="flex flex-col-reverse lg:flex-row justify-between h-full">
                <motion.div
                  variants={linkVars}
                  className="flex flex-row lg:self-end items-center gap-2"
                ></motion.div>

                <div className="lg:w-1/2 text-black pt-32 flex flex-col justify-end gap-10 2xl:gap-14">
                  <motion.div variants={linkVars}>
                    <Link
                      onClick={toggleMenu}
                      className={cn(
                        "space-y-6 headlines hover:text-primary duration-700 transition-colors",
                        isExactPath("/packages") ? "text-primary" : "text-black"
                      )}
                      href={"/packages"}
                    >
                      <p className="body">Packages</p>
                      <div className="bg-black w-full h-px" />
                    </Link>
                  </motion.div>

                  <motion.div variants={linkVars}>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="packages" className="border-b-0">
                        <AccordionTrigger
                          className={cn(
                            "space-y-6 headlines hover:text-primary duration-700 transition-colors",
                            isSubPath("/packages")
                              ? "text-primary"
                              : "text-black"
                          )}
                        >
                          Destinations
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="w-full py-4 flex flex-col gap-2 px-1">
                            {destinations.map((destination) => (
                              <Link
                                key={destination.id}
                                href={destination.link}
                                onClick={toggleMenu}
                                className={cn(
                                  "space-y-6 titlel hover:text-primary duration-700 transition-colors",
                                  isExactPath(destination.link)
                                    ? "text-primary"
                                    : "text-black"
                                )}
                              >
                                <div className="flex flex-row gap-3">
                                  <p className="body">{destination.name}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <div className="bg-black w-full h-px" />
                  </motion.div>

                  <motion.div variants={linkVars}>
                    <Link
                      onClick={toggleMenu}
                      className={cn(
                        "space-y-6 headlines hover:text-primary duration-700 transition-colors",
                        isExactPath("/blog") ? "text-primary" : "text-black"
                      )}
                      href={"/blog"}
                    >
                      <p className="body">Blog</p>
                      <div className="bg-black w-full h-px" />
                    </Link>
                  </motion.div>

                  <motion.div variants={linkVars}>
                    <Link
                      onClick={toggleMenu}
                      className={cn(
                        "space-y-6 headlines hover:text-primary duration-700 transition-colors",
                        isExactPath("/about") ? "text-primary" : "text-black"
                      )}
                      href={"/about"}
                    >
                      <p className="body">About</p>
                      <div className="bg-black w-full h-px" />
                    </Link>
                  </motion.div>

                  <motion.div variants={linkVars}>
                    <Link
                      onClick={toggleMenu}
                      className={cn(
                        "space-y-6 headlines hover:text-primary duration-700 transition-colors",
                        isExactPath("/contact") ? "text-primary" : "text-black"
                      )}
                      href={"/contact"}
                    >
                      <p className="body">Contact</p>
                      <div className="bg-black w-full h-px" />
                    </Link>
                  </motion.div>

                  <Link href={""}>
                    <motion.div variants={linkVars}>
                      <ContactDialog link="" title="Enquire Now" />
                    </motion.div>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
export default Header;
