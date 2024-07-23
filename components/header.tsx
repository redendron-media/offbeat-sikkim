"use client";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navlinks } from "@/constants";
import { cn } from "@/lib/utils";
import { IconButton, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ContactDialog from "./contact-dialog/page";
interface NavbarScrollProps {
  toggleMenu: () => void;
}

function Header() {
  const [navbar, setNavbar] = useState(false);
  const pathname = usePathname();
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
      opacity: 0,
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

  const Navbar: React.FC<NavbarScrollProps> = ({ toggleMenu }) => {
    return (
      <nav className="fixed top-0 bg-[#F6FBF4] z-30 flex flex-row w-full justify-between px-4 md:px-6 py-6 md:py-9">
        <Link href={"/"}>
          <Image
            className="md:w-28 md:h-9 lg:w-40 lg:h-11"
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
                  isCurrentPath(item.link) ? "text-primary" : "text-black"
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
          <MenuIcon />
        </IconButton>
      </nav>
    );
  };
  const isCurrentPath = (path: string) => pathname.startsWith(path);
  return (
    <>
      <AnimatePresence>
        <Navbar toggleMenu={toggleMenu} />
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
