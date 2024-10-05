"use client";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navlinks } from "@/constants";
import { cn } from "@/lib/utils";
import { IconButton, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ContactDialog from "./contact-dialog/page";
interface NavbarScrollProps {
  toggleMenu: () => void;
  isScrolling: boolean;
}

function Header() {
  const [navbar, setNavbar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === '/';
  const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 768;
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
      paddingTop:"1.5rem" ,
      paddingBottom:"1.5rem",
      transition: {
        duration: 0.7,
        ease: [0.33, 1, 0.68, 1],
      }
    },
    animate: {
 
      opacity: 1,
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      paddingTop: isSmallScreen ? "1.25rem" : "0.75rem",
      paddingBottom: isSmallScreen ? "1.25rem" : "0.5rem", 
      backgroundColor: "#F6FBF4",
      transition: {
        duration: 0.7,
        ease: [0.33, 1, 0.68, 1],
      }
    },
    backToTop: {
      paddingTop:"1.5rem" ,
      paddingBottom:"1.5rem",
      opacity: 1,
      boxShadow: "none",
      transition: {
        duration: 0.7,
        ease: [0.33, 1, 0.68, 1],
      }
    },
    exit: {
      paddingTop:"1.5rem" ,
      paddingBottom:"1.5rem",
      y: 0,
      opacity: 1,
      backgroundColor: "transparent",
      transition: {
        duration: 0.3, 
        ease: [0.33, 1, 0.68, 1],
      }
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

  const Navbar: React.FC<NavbarScrollProps> = ({ toggleMenu,isScrolling }) => {
    return (
      <motion.nav 
      initial="initial"
      animate={isScrolling ? "animate" : "backToTop"}
      exit="exit"
      variants={NavAnimations}
      className="fixed top-0 z-30 flex flex-row w-full justify-between px-4 md:px-6 py-6 md:py-9">
        <Link href={"/"}>
          <Image
            className="md:w-28  md:h-9 lg:w-40 lg:h-11"
            src={"/logo.svg"}
            width={96}
            height={28}
            alt="logo"
          />
        </Link>
        <Stack
          className="hidden items-center lg:flex"
          direction={"row"}
          spacing={3}
        >
          {navlinks.map((item,index) => (
            <motion.div key={index} variants={linkVars}>
              <Link
                className={cn(
                  "space-y-6 hover:text-primary duration-700 transition-colors",
                  isCurrentPath(item.link)
                  ? "text-primary" 
              : isHomepage
              ? isScrolled
                ? "text-black" 
                : "text-white" 
              : "text-black"
          )}
                href={item.link}
              >
                <p className="bodyl xl:titlel">{item.name}</p>
              </Link>
            </motion.div>
          ))}
          <ContactDialog link="" title="Enquire Now" />
        </Stack>
        <IconButton className="lg:hidden rounded-none p-0" onClick={toggleMenu}>
          <MenuIcon className={cn(isScrolled?'text-black':'text-white')}/>
        </IconButton>
      </motion.nav>
    );
  };
  const isCurrentPath = (path: string) => pathname.startsWith(path);
  return (
    <>
      <AnimatePresence>
        <Navbar toggleMenu={toggleMenu} isScrolling={isScrolled} />
      </AnimatePresence>
      <AnimatePresence>
        {navbar && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0  z-50 h-screen w-full origin-top bg-white px-8 md:px-24 py-6"
          >
            <div className="w-full relative h-full">
              <motion.div variants={linkVars} className="relative">
                <IconButton
                  size="large"
                  onClick={toggleMenu}
                  className=" bg-transparent fixed right-4 p-0"
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
                  {navlinks.map((item, index) => (
                    <motion.div key={index} variants={linkVars}>
                      <Link
                        onClick={toggleMenu}
                        className={cn(
                          "space-y-6 headlines hover:text-primary duration-700 transition-colors",
                          isCurrentPath(item.link)
                            ? "text-primary"
                            : "text-black"
                        )}
                        href={item.link}
                      >
                        <p className="body">{item.name}</p>
                        <div className="bg-black w-full h-px" />
                      </Link>
                    </motion.div>
                  ))}
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
